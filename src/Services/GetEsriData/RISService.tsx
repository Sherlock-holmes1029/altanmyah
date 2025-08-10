// src/Services/GetEsriData/RISService.ts
import axios from "axios";

function buildWhere({
  section,
  sectorName,
  adminLevels,
  period,
}: {
  section: "mun" | "gov";
  sectorName: string;
  adminLevels: number[];
  period: number;
}) {
  const sectorField = section === "mun" ? "Sector_Mun" : "Sector";
  const adminIn = adminLevels.join(",");
  return `${sectorField} = '${sectorName}' AND isFlag = 0 AND Is_Active = 1 AND Admin_Level IN (${adminIn}) AND Period = ${period}`;
}

export async function queryDynamicTexts({
  token,
  section = "mun",
  sectorName = "General",
  adminLevels = [1],
  period = 4,
  outFields = "*",
}: {
  token: string;
  section?: "mun" | "gov";
  sectorName?: string;
  adminLevels?: number[];
  period?: number;
  outFields?: string;
}) {
  const url =
    "https://tanmiah.jo/arcgis/rest/services/RIS_DataEntry_Service/FeatureServer/43/query";

  const params: any = {
    f: "json",
    where: buildWhere({ section, sectorName, adminLevels, period }),
    outFields,
    returnGeometry: false,
    token,
    resultRecordCount: 1000, // just in case there are many
  };

  try {
    const { data } = await axios.get(url, { params });
    console.log("RAW RESPONSE:", data); // <-- see what's coming back
    if (data?.error) {
      console.error("ArcGIS error:", data.error);
      return [];
    }
    return data.features ?? [];
  } catch (e: any) {
    console.error("Request failed:", e?.message || e);
    return [];
  }
}
