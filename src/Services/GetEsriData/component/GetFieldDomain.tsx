interface CodedValue {
  code: string | number;
  name: string;
}

interface FieldDomain {
  codedValues?: CodedValue[];
}

interface Field {
  name: string;
  domain?: FieldDomain;
}

export async function GetFieldDomain(fields: Field[]): Promise<Record<string, CodedValue[]>> {
  const domains = fields?.reduce((object: Record<string, CodedValue[]>, field: Field) => {
    const codedValues = field?.domain?.codedValues;
    if (codedValues) return { ...object, [field.name]: codedValues };
    return object;
  }, {});
  return domains;
}
