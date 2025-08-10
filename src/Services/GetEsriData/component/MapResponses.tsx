interface TypeDomain {
  [domainName: string]: {
    codedValues: Record<string | number, { name: string }>;
  };
}

interface Types {
  [typeId: string]: {
    name: string;
    domains: TypeDomain;
  };
}

interface Response {
  [key: string]: any;
}

export function MapResponsesWithDynamicTypes(
  responses: Response[],
  types: Types,
  typeIdField: string
): Response[] {
  const mappedResponses: Response[] = [];

  for (const response of responses) {
    const mappedResponse: Response = {};

    const typeId: string = response[typeIdField];

    if (types[typeId]) {
      const typeIdName = types[typeId].name;
      mappedResponse[`${typeIdField}Name`] = typeIdName;

      for (const domainName in types[typeId].domains) {
        if (types[typeId].domains.hasOwnProperty(domainName)) {
          const domain = types[typeId].domains[domainName];
          const codedValueKey = response[domainName];
          const codedValue = domain.codedValues[codedValueKey];
          mappedResponse[`${domainName}Name`] = codedValue ? codedValue.name : null;
        }
      }
    }

    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        mappedResponse[key] = response[key];
      }
    }

    mappedResponses.push(mappedResponse);
  }

  return mappedResponses;
}
