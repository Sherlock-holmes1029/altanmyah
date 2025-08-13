import axios from "axios";

const BASE =
  "https://tanmiah.jo/arcgis/rest/services/RIS_DataEntry_Service/FeatureServer/43/query";

type EsriFeature = { attributes: Record<string, unknown> };
type EsriQueryResponse = { features?: EsriFeature[]; error?: { message?: string } };

async function esriGet(params: Record<string, unknown>): Promise<EsriQueryResponse> {
  const { data } = await axios.get<EsriQueryResponse>(BASE, {
    params: { f: "json", returnGeometry: false, ...params },
  });
  if ((data as any)?.error) throw new Error((data as any).error.message || "ArcGIS error");
  return data;
}

async function distinct<T extends string | number>(
  token: string,
  field: string,
  where = "1=1"
): Promise<T[]> {
  const data = await esriGet({
    where,
    outFields: "*",
    returnDistinctValues: true,
    orderByFields: field,
    token,
  });

  const list = (data.features ?? [])
    .map((f) => f.attributes?.[field])
    .filter((v): v is T => v !== null && v !== undefined) as T[];

  return Array.from(new Set<T>(list));
}

export async function getAdminLevels(token: string) {
  const list = await distinct<number>(token, "Admin_Level");
  const nums = list.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
  return nums
    .sort((a, b) => a - b)
    .map((v) => ({ value: String(v), label: String(v) }));
}

export async function getPeriods(token: string) {
  const list = await distinct<number>(token, "Period");
  const nums = list.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
  return nums
    .sort((a, b) => a - b)
    .map((v) => ({ value: String(v), label: String(v) }));
}

function sectorFieldFor(adminLevel: string) {
  // Municipality (4) uses Sector_Mun; others use Sector
  return adminLevel === "4" ? "Sector_Mun" : "Sector";
}

export async function getSectors(token: string, adminLevel: string, period: string) {
  const field = sectorFieldFor(adminLevel);
  const where = `isFlag = 0 AND Is_Active = 1 AND Admin_Level IN (${adminLevel}) AND Period = ${period}`;
  const list = await distinct<any>(token, field, where);
  return list.map((v) => ({ value: v, label: v }));
}

export type DynField = { name: string; title: string; type: "number" | "text"; order: number };

export async function getConfigFields(
  token: string,
  opts: { adminLevel: string; period: string; sectorValue: string }
): Promise<DynField[]> {
  const field = sectorFieldFor(opts.adminLevel);

  // Escape single quotes in value to be safe in WHERE
  const safeSectorValue = String(opts.sectorValue).replace(/'/g, "''");

  const where =
    `${field} = '${safeSectorValue}' ` +
    `AND isFlag = 0 AND Is_Active = 1 ` +
    `AND Admin_Level IN (${opts.adminLevel}) ` +
    `AND Period = ${opts.period}`;

  const data = await esriGet({
    where,
    outFields: "*",
    resultRecordCount: 2000,
    token,
  });

  const rows = (data.features ?? []).map((f) => f.attributes);

  return rows
    .map((a: any) => {
      const name = a?.Entry_Field || a?.GIS_Field || `Field_${a?.OBJECTID}`;
      if (!name) return null;

      const title =
        a?.Entry_Arabic_Alias || a?.Entry_English_Alias || a?.Entry_Field || name;

      // Treat I (integer) and D (decimal) as numeric
      const isNumeric =
        a?.EntryField_Type === "I" ||
        a?.EntryField_Type === "D" ||
        /^Field_(I|D)_/.test(String(a?.Entry_Field));

      const order = typeof a?.Field_Order === "number" ? a.Field_Order : 9999;

      const type: "number" | "text" = isNumeric ? "number" : "text";

      return { name, title, type, order };
    })
    .filter((x): x is DynField => Boolean(x))
    .sort((x, y) => (x.order - y.order) || x.title.localeCompare(y.title, "ar"));
}
