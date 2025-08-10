export type OptionType = {
  label: string;
  value: string | number;
};

export type DynamicInputProps = {
  inputType: 'text' | 'number' | 'select' | 'date';
  placeholder?: string;
  isRequired?: boolean;
  disabled?:boolean;
  options?: OptionType[];
  title: string;
  name: string;
  defaultValue?:any;
};