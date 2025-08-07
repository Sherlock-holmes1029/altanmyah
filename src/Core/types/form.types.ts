export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox";
  defaultValue: any;
  validation?: any;
  options?: { label: string; value: string }[];
  
}
