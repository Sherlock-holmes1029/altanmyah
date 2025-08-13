import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Point from "@arcgis/core/geometry/Point";
import { MapResponsesWithDynamicTypes } from "./component/MapResponses";
import { MakeEsriFeatureTypesPretty } from "./component/MakeEsriFeatureTypesPretty";
import { GetFieldDomain } from "./component/GetFieldDomain";
import { AddGeometryAndNamedValuesState } from "./component/AddGeometry";
import type { Geometry } from "@arcgis/core/geometry";

interface Domain {
  code: string | number;
  name: string;
}

interface ExternalDomain extends Domain {}
interface GetEsriDataOptions {
  query?: string;
  geometry?: Geometry | null;
  outFields?: string;
  externalDomains?: ExternalDomain[];
  spatialReference?: any; 
  returnGeometry?: boolean;
  objectIds?: number[] | null;
  queryFeaturesOptions?: any;
  isGetDataExceedLimit?: boolean;
  needCount?: boolean;
  needAttachments?: boolean;
  attachmentQuery?: any;
  x?: number;
  y?: number;
}

interface EsriDataReturnType {
  domains: Record<string, Domain[]>;
  domainsAsMap: Record<string, Record<string, Domain>>;
  fields: any[]; 
  res: any[]; 
  types: any[]; 
  typesNameAsKey: Record<string, any>;
  featureLayer: FeatureLayer;
  featureLayerQuery: any; 
  featureItemsCount?: number;
  relatedDataResponses?: any[]; 
  featureLayerName: string;
}

export default async function getEsriData(
  paramUrl:string,
  {
    query = "1=1",
    geometry = null,
    outFields = "*",
    externalDomains = [],
    spatialReference = null,
    returnGeometry = true,
    objectIds = null,
    queryFeaturesOptions = {},
    isGetDataExceedLimit = false,
    needCount = false,
    needAttachments = false,
    attachmentQuery = {},
    x,
    y,
  }:GetEsriDataOptions = {},
):Promise<EsriDataReturnType> {
  const url = paramUrl;
  const featureLayer = new FeatureLayer({
    url,
  });
  await featureLayer.load();

  if (x !== undefined && y !== undefined) {
    geometry = new Point({
      x,
      y,
      // spatialReference: featureLayer.spatialReference,
    });
  }

  let domains = await GetFieldDomain(featureLayer.fields);

  domains = { ...domains, ...externalDomains };

  let domainsAsMap = Object.entries(domains).reduce((prev, [key, value]) => {
    const res = value?.reduce((prev, curr) => {
      prev[curr.code] = curr;
      prev[curr.name] = curr;
      return prev;
    }, {});
    prev[key] = res;
    return prev;
  }, {});
  const fields = featureLayer.fields;
  let serverFeatureLayerQuery = {};
  let featureItemsCount;

  try {
    serverFeatureLayerQuery = await featureLayer.queryFeatures({
      where: query,
      objectIds,
      outFields,
      returnGeometry,
      geometry,
      outSpatialReference: spatialReference,

      ...queryFeaturesOptions,
    });
    let isExceededLimit = serverFeatureLayerQuery.exceededTransferLimit;
    let start = serverFeatureLayerQuery?.features?.length;

    while (isGetDataExceedLimit && isExceededLimit) {
      const exceedFeatureLayerQuery = await featureLayer.queryFeatures({
        where: query,
        objectIds,
        outFields,
        returnGeometry,
        geometry,
        outSpatialReference: spatialReference,
        ...queryFeaturesOptions,
        start,
        num: 2000,
      });

      serverFeatureLayerQuery.features = [
        ...serverFeatureLayerQuery.features,
        ...exceedFeatureLayerQuery.features,
      ];
      start += exceedFeatureLayerQuery?.features?.length;
      isExceededLimit = exceedFeatureLayerQuery.exceededTransferLimit;
    }
  } catch (error) {
    throw error;
  }

  if (needCount) {
    featureItemsCount  = await featureLayer.queryFeatureCount({
      where: query, // Your attribute query
      geometry: geometry, // The geometry to filter features
      spatialRelationship: "intersects", // Choose the appropriate spatial filter
    });
  }
  const [types, typesNameAsKey] = featureLayer.types
    ? []
    : [];
  let res = AddGeometryAndNamedValuesState(
    serverFeatureLayerQuery.features,
    domains,
    types,
  );

  if (featureLayer.typeIdField && types && res?.length) {
    res = MapResponsesWithDynamicTypes(res, types, featureLayer.typeIdField);
  }
  let relatedDataResponses;
  if (queryFeaturesOptions?.relationshipIds) {
    const { relationshipIds } = queryFeaturesOptions;
    const relatedDataPromises = relationshipIds.map((id) =>
      featureLayer.queryRelatedFeatures({
        relationshipId: id,
        objectIds: res.map((item) => item.OBJECTID),
      }),
    );
    relatedDataResponses = await Promise.all(relatedDataPromises);
  }

  if (needAttachments && res?.length) {
    const objectIds = res?.map((item) => item.OBJECTID);
    try {
      const attachments = await featureLayer.queryAttachments({
        objectIds,
        returnMetadata: true,
        ...attachmentQuery,
      });
      res?.forEach((feature) => {
        const attachment = attachments[feature.OBJECTID];
        if (attachment) {
          feature.attachments = attachment;
        }
      });
    } catch (error) {
      throw error;
    }
  }

  return {
    domains,
    domainsAsMap,
    fields,
    res,
    types,
    typesNameAsKey,
    featureLayer: featureLayer,
    featureLayerQuery: serverFeatureLayerQuery,
    featureItemsCount,
    relatedDataResponses,
    featureLayerName: featureLayer.sourceJSON.name,
  };
}
