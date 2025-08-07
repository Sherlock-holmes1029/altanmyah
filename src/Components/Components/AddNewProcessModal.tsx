import CustomModal from "./CustomModal";
import type { CustomModalProps } from "../../Core/types/ModalProps";
import React, { useState } from "react";
import { Button, Form, Input, Select, Steps, message, theme } from "antd";
import { useForm, FormProvider, Controller } from "react-hook-form";

const { Option } = Select;

const AddNewProcessModal: React.FC<CustomModalProps> = ({
  open,
  onCancel,
  title = "تحديد عملية الاضافة",
}) => {
  const [current, setCurrent] = useState(0);

  const methods = useForm({
    defaultValues: {
      addType: "",
      processLevel: "",
      sectorName: "",
      fieldName: "",
      fieldType: "",
      MunicipalitySection: "",
      fieldInput: "",
      processType: "",
      wantedFieldProcess: "",
      fieldNameStatment:"",
      statementTitleAr: "",
      statementTitleEn: "",
      isActive: "",
      period: "",
      indicatorNumber: "",
    },
  });

  const next = async () => {
    const valid = await methods.trigger();
    if (valid) setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Final Data:", data);
    message.success("تم ارسال البيانات بنجاج");
    setCurrent(0);
    methods.reset();
    onCancel?.();
  });

  const errorMsg = "هذا الحقل مطلوب";
  const addType = methods.watch("addType");
  const processType = methods.watch("processType");
  const MunicipalitySection = methods.watch("MunicipalitySection");
  const isProcessType = [
    "divide_by_field_percentage",
    "divide_by_field_average",
  ].includes(processType);

  title = addType
    ? MunicipalitySection
      ? `إضافة ${addType} - ${MunicipalitySection}`
      : `إضافة ${addType}`
    : title;

  const calculationDescriptions = {
    national_ratio: "قيمة البيان / مجموع قيم المحافظات * 100",
    same_value: "نفس قيمة الإدخال",
    monthly_average: "قيمة البيان / 12",
    per_1000_population: "قيمة البيان / عدد السكان * 1000",
    per_10000_population: "قيمة البيان / عدد السكان * 10000",
    per_1000_households: "قيمة البيان / عدد الأسر * 1000",
    kingdom_ratio: "قيمة البيان / عدد السكان في المملكة * 100",
    divide_by_field_percentage: "قيمة البيان / قيمة حقل آخر (نسبة)",
    divide_by_field_average: "قيمة البيان / قيمة حقل آخر (متوسط)",
    per_1000_pop_layer: "قيمة البيان * 1000 / عدد سكان المحافظة",
    per_10000_pop_layer: "قيمة البيان * 10000 / عدد سكان المحافظة",
    per_100_households: "قيمة البيان * 100 / عدد الأسر",
    per_100_area: "قيمة البيان * 100 / مساحة المحافظة",
    per_1000_area: "قيمة البيان * 1000 / مساحة المحافظة",
    divide_by_household_avg: "قيمة البيان / عدد الأسر (متوسط)",
  };

  const steps = [
    {
      title: "النوع",
      content: (
        <>
          <Form.Item
            label="نوع عملية الاضافة"
            validateStatus={methods.formState.errors.addType ? "error" : ""}
            help={methods.formState.errors.addType && errorMsg}
          >
            <Controller
              name="addType"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select placeholder="اختر" {...field}>
                  <Option value="مؤشر فقط">مؤشر فقط</Option>
                  <Option value="مؤشر وبيان">مؤشر وبيان</Option>
                  <Option value="بيان فقط">بيان فقط</Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="المستوى"
            validateStatus={
              methods.formState.errors.processLevel ? "error" : ""
            }
            help={methods.formState.errors.processLevel && errorMsg}
          >
            <Controller
              name="processLevel"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select placeholder="اختر المستوى" {...field}>
                  <Option value="high">عالي</Option>
                  <Option value="medium">متوسط</Option>
                  <Option value="low">منخفض</Option>
                </Select>
              )}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "التفاصيل",
      content: (
        <>
          {addType === "مؤشر فقط" ? (
            <>
              <Form.Item
                label="قطاع البلدية"
                validateStatus={
                  methods.formState.errors.MunicipalitySection ? "error" : ""
                }
                help={methods.formState.errors.MunicipalitySection && errorMsg}
              >
                <Controller
                  name="MunicipalitySection"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select placeholder="اختر القطاع" {...field}>
                      <Option value="الصحة">الصحة</Option>
                      <Option value="التعليم">التعليم</Option>
                      <Option value="البنية التحتية">البنية التحتية</Option>
                      <Option value="البيئة">البيئة</Option>
                    </Select>
                  )}
                />
              </Form.Item>

              <Form.Item
                label="حقل الإدخال"
                validateStatus={
                  methods.formState.errors.fieldInput ? "error" : ""
                }
                help={methods.formState.errors.fieldInput && errorMsg}
              >
                <Controller
                  name="fieldInput"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select placeholder="اختر الحقل" {...field}>
                      <Option value="مساحة التنظيم (كم²)">
                        مساحة التنظيم (كم²)
                      </Option>
                      <Option value="المساحة الكلية للبلدية (كم²)">
                        المساحة الكلية للبلدية (كم²)
                      </Option>
                      <Option value="عدد السكان في البلدية">
                        عدد السكان في البلدية
                      </Option>
                      <Option value="عدد المناطق (المدن و القرى) في البلدية">
                        عدد المناطق (المدن و القرى) في البلدية
                      </Option>
                      <Option value="الرقم الوطني للبلدية">
                        الرقم الوطني للبلدية
                      </Option>
                      <Option value="البعد عن مركز المحافظة (كم)">
                        البعد عن مركز المحافظة (كم)
                      </Option>
                      <Option value="البعد عن العاصمة (كم)">
                        البعد عن العاصمة (كم)
                      </Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                label="اسم القطاع"
                validateStatus={
                  methods.formState.errors.sectorName ? "error" : ""
                }
                help={methods.formState.errors.sectorName && errorMsg}
              >
                <Controller
                  name="sectorName"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="اسم القطاع" />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="اسم الحقل"
                validateStatus={
                  methods.formState.errors.fieldName ? "error" : ""
                }
                help={methods.formState.errors.fieldName && errorMsg}
              >
                <Controller
                  name="fieldName"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} placeholder="اسم الحقل" />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="نوع الحقل"
                validateStatus={
                  methods.formState.errors.fieldType ? "error" : ""
                }
                help={methods.formState.errors.fieldType && errorMsg}
              >
                <Controller
                  name="fieldType"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select placeholder="اختر النوع" {...field}>
                      <Option value="number">عدد</Option>
                      <Option value="percentage">نسبة</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </>
          )}
        </>
      ),
    },
    {
      title: "المعادلة",
      content: (
        <>
          {addType !== "option3" && (
            <>
              <Form.Item
                label="نوع العملية"
                validateStatus={
                  methods.formState.errors.processType ? "error" : ""
                }
                help={methods.formState.errors.processType && errorMsg}
              >
                <Controller
                  name="processType"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select placeholder="اختر" {...field}>
                      {Object.entries(calculationDescriptions).map(
                        ([key, label]) => (
                          <Option key={key} value={key}>
                            {label}
                          </Option>
                        )
                      )}
                    </Select>
                  )}
                />
              </Form.Item>

              <Form.Item label="اختر الحقل الآخر (نسبة/متوسط)">
                <Controller
                  name="wantedFieldProcess"
                  control={methods.control}
                  rules={{ required: isProcessType }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="الحقل الآخر"
                      disabled={!isProcessType}
                    >
                      <Option value="population">عدد السكان</Option>
                      <Option value="area">المساحة</Option>
                      <Option value="households">عدد الأسر</Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </>
          )}
        </>
      ),
    },
    {
      title: "البيان",
      content: (
        <>
          <Form.Item
            label="العنوان بالعربية"
            validateStatus={
              methods.formState.errors.statementTitleAr ? "error" : ""
            }
            help={methods.formState.errors.statementTitleAr && errorMsg}
          >
            <Controller
              name="statementTitleAr"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="العنوان بالإنجليزية"
            validateStatus={
              methods.formState.errors.statementTitleEn ? "error" : ""
            }
            help={methods.formState.errors.statementTitleEn && errorMsg}
          >
            <Controller
              name="statementTitleEn"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="الحالة"
            validateStatus={methods.formState.errors.isActive ? "error" : ""}
            help={methods.formState.errors.isActive && errorMsg}
          >
            <Controller
              name="isActive"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="اختر">
                  <Option value="active">فعال</Option>
                  <Option value="inactive">غير فعال</Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="الفترة الزمنية"
            validateStatus={methods.formState.errors.period ? "error" : ""}
            help={methods.formState.errors.period && errorMsg}
          >
            <Controller
              name="period"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="اختر الفترة">
                  <Option value="daily">يومي</Option>
                  <Option value="monthly">شهري</Option>
                  <Option value="yearly">سنوي</Option>
                </Select>
              )}
            />
          </Form.Item>
        </>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <CustomModal
      title={title}
      open={open}
      onCancel={() => {
        setCurrent(0);
        methods.reset();
        onCancel?.();
      }}
    >
      <FormProvider {...methods}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Steps current={current} items={items} />
          <div style={{ marginTop: 24 }}>{steps[current].content}</div>

          <div style={{ marginTop: 24, textAlign: "end" }}>
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                السابق
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                التالي
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                ارسال
              </Button>
            )}
          </div>
        </Form>
      </FormProvider>
    </CustomModal>
  );
};

export default AddNewProcessModal;
