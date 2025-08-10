import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import type { ControllerRenderProps } from "react-hook-form";
import type {
  DynamicInputProps,
} from "../../Core/types/DynamicInputType";

const { Option } = Select;

const DynamicInput: React.FC<DynamicInputProps> = ({
  inputType,
  placeholder,
  isRequired,
  options = [],
  title,
  name,
  defaultValue,
  disabled
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMsg = "هذا الحقل مطلوب";

  const renderInput = (field: ControllerRenderProps<any, string>) => {
    switch (inputType) {
      case "text":
        return <Input {...field} placeholder={placeholder} />;
      case "number":
        return <Input {...field} type="number" placeholder={placeholder} min={0} />;
      case "select":
        return (
          <Select {...field} placeholder={placeholder}>
            {options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={(dateString) => field.onChange(dateString)}
          />
        );
      default:
        return <Input {...field} placeholder={placeholder} />;
    }
  };

  return (
    <Form.Item
      label={title}
      validateStatus={errors[name] ? "error" : ""}
      className="w-full"
      help={errors[name] && errorMsg}
    >
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        disabled={disabled}
        rules={{ required: isRequired }}
        render={({ field }) => renderInput(field)}
      />
    </Form.Item>
  );
};

export default DynamicInput;
