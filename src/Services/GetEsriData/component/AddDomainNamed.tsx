interface DomainValue {
  code: string | number;
  name: string;
}
interface Domains {
  [key: string]: DomainValue[];
}

interface Attribute {
  [key: string]: string | number;
}

export function AddDomainNamedValuesToAttributes(domains: Domains, attribute: Attribute): Record<string, string> {
  const objectWithDomainFieldsAsName: Record<string, string> = {};
  Object.entries(domains).forEach(([key, value]) => {
    const foundDomain = value.find(
      (valueItem) => Number(valueItem.code) === Number(attribute[key])
    );
    objectWithDomainFieldsAsName[`${key}Name`] = foundDomain ? foundDomain.name : "";
  });
  return objectWithDomainFieldsAsName;
}