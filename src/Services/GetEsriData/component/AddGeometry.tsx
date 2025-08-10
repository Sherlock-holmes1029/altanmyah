import { AddDomainNamedValuesToAttributes } from "./AddDomainNamed";
import { InjectDates } from "./InjectDates";

export function AddGeometryAndNamedValuesState(features, domains) {
  if (!features || features.length < 1) return [];
  // get date keys using regex to extract the iso form
  const keys = Object.keys(features[0].attributes);
  const dateKeys = keys.filter((item) => item.match(/date/gi));
  if (!domains)
    return features.map((feature) => ({
      ...feature.attributes,
      ...InjectDates(feature, dateKeys),
      geometry: feature.geometry,
    }));
  return features
    .map((feature) => ({
      ...feature.attributes,
      ...InjectDates(feature, dateKeys),
      geometry: feature.geometry,
    }))
    .map((item) => {
      const domainFieldsAsName = AddDomainNamedValuesToAttributes(
        domains,
        item,
      );
      return { ...item, ...domainFieldsAsName };
    });
}
