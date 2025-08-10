interface CodedValue {
  code: string | number;
  name: string;
}

interface Domain {
  name: string;
  type: string;
  codedValues?: CodedValue[];
}

interface EsriFeatureType {
  id: string | number;
  name: string;
  domains: Record<string, Domain>;
}

export function MakeEsriFeatureTypesPretty(inputData: EsriFeatureType[]): [Record<string, any>, Record<string, any>] {
  const transformedData: Record<string, any> = {};
  const transformedDataNameAsKey: Record<string, any> = {};
  
  inputData.forEach((item) => {
    const { id, name, domains } = item;
    const codedValues: Record<string, any> = {};
  
    for (const domainKey in domains) {
      if (Object.hasOwnProperty.call(domains, domainKey)) {
        const domain = domains[domainKey];
        const codedValuesDynamic: Record<string, { name: string; code: string | number; }> = {};
  
        domain.codedValues?.forEach((codedValue) => {
          codedValuesDynamic[codedValue.code.toString()] = {
            name: codedValue.name,
            code: codedValue.code,
          };
        });
  
        const hasCodedValues = Object.values(codedValuesDynamic).length > 0;
        if (hasCodedValues) {
          codedValues[domainKey] = {
            name: domain.name,
            type: domain.type,
            codedValues: codedValuesDynamic,
          };
        } else {
          delete codedValues[domainKey];
        }
      }
    }
  
    transformedData[id.toString()] = { name, domains: codedValues, id };
    transformedDataNameAsKey[name] = { name, domains: codedValues, id };
  });
  
  return [transformedData, transformedDataNameAsKey];
}
