import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, DatePicker, Button } from "antd";
import { DevTool } from "@hookform/devtools";

const { Option } = Select;

export type FormFieldConfig = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "date";
  defaultValue?: any;
  options?: { label: string; value: string | number }[];
  validation?: any;
};

interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: any) => void;
  renderWrapper?: (
    fieldElement: React.ReactNode,
    field: FormFieldConfig
  ) => React.ReactNode;
  className?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  renderWrapper,
  className,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] =
        field.defaultValue ?? (field.type === "checkbox" ? false : "");
      return acc;
    }, {} as any),
  });

  const renderField = (field: FormFieldConfig) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <Input {...controllerField} type={field.type} />
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <Select
                {...controllerField}
                onChange={(value) => controllerField.onChange(value)}
                value={controllerField.value}
              >
                {field.options?.map((opt) => (
                  <Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Option>
                ))}
              </Select>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Checkbox
                checked={controllerField.value}
                onChange={(e) => controllerField.onChange(e.target.checked)}
              >
                {field.label}
              </Checkbox>
            )}
          />
        );

      case "date":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: controllerField }) => (
              <DatePicker
                className="w-full"
                onChange={(date) => controllerField.onChange(date)}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className || ""}`}
    >
      {fields.map((field) => {
        const fieldElement = (
          <div key={field.name} className="w-full">
            {field.type !== "checkbox" && (
              <label className="block mb-1 font-medium">{field.label}</label>
            )}
            {renderField(field)}
          </div>
        );

        return renderWrapper
          ? renderWrapper(fieldElement, field)
          : fieldElement;
      })}

      <Button htmlType="submit" type="primary">
        إرسال
      </Button>

      <DevTool control={control} />
    </form>
  );
};

export default DynamicForm;
