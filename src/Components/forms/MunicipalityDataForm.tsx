import React from "react";
import {
  Row,
  Col,
  Select,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
} from "antd";
import { useForm, Controller } from "react-hook-form";
const { Option } = Select;
const { Title } = Typography;

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
const quarters = ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"];
const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const MunicipalityDataForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-[#fcfcf7] min-h-screen rounded-2xl shadow-lg mb-6">
      <Title level={4} className="text-green-700">
        شاشات ادخال البطاقة التعريفية
      </Title>

      {/* Filters */}
      <Row gutter={16} className="mb-4 flex flex-wrap">
        <Col xs={24} sm={12} md={6} className="mb-2">
          <label>المحافظة</label>
          <Controller
            name="governorate"
            control={control}
            defaultValue="العاصمة"
            render={({ field }) => (
              <Select {...field} className="w-full">
                <Option value="العاصمة">محافظة العاصمة</Option>
                <Option value="الزرقاء">محافظة الزرقاء</Option>
              </Select>
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-2">
          <label>البلدية</label>
          <Controller
            name="municipality"
            control={control}
            defaultValue="حسبان"
            render={({ field }) => (
              <Select {...field} className="w-full">
                <Option value="حسبان">حسبان</Option>
              </Select>
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={4} className="mb-2">
          <label>السنة</label>
          <Controller
            name="year"
            control={control}
            defaultValue={currentYear.toString()}
            render={({ field }) => (
              <Select {...field} className="w-full">
                {years.map((year) => (
                  <Option key={year} value={year.toString()}>{year}</Option>
                ))}
              </Select>
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={4} className="mb-2">
          <label>الفترة</label>
          <Controller
            name="period"
            control={control}
            defaultValue="سنوي"
            render={({ field }) => (
              <Select {...field} className="w-full">
                <Option value="سنوي">سنوي</Option>
                <Option value="شهري">شهري</Option>
              </Select>
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={4} className="mb-2 flex items-end">
          <Controller
            name="lockOptions"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>تثبيت الخيارات</Checkbox>
            )}
          />
        </Col>
      </Row>

      {/* Quarter & Month */}
      <Row gutter={16} className="mb-6 flex flex-wrap">
        <Col xs={24} sm={12} md={4} className="mb-2">
          <label>الربع</label>
          <Controller
            name="quarter"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="الرجاء الاختيار" className="w-full">
                {quarters.map((q, i) => (
                  <Option key={i} value={(i + 1).toString()}>{q}</Option>
                ))}
              </Select>
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={4} className="mb-2">
          <label>الشهر</label>
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="الرجاء الاختيار" className="w-full">
                {months.map((month, i) => (
                  <Option key={i + 1} value={(i + 1).toString()}>{month}</Option>
                ))}
              </Select>
            )}
          />
        </Col>

        <Col xs={24} sm={12} md={4} className="mb-2 flex justify-center items-end">
          <Button className="bg-green-600 text-white w-full truncate">تحميل البيانات من ملف اكسل</Button>
        </Col>
        <Col xs={24} sm={12} md={4} className="mb-2 flex justify-center items-end">
          <Button className="bg-green-600 text-white w-full truncate">تصدير البيانات الى ملف اكسل</Button>
        </Col>
      </Row>

      <Divider />

      <div className="flex flex-wrap gap-4">
        {[
          "areaPlanning",
          "areaGovernorate",
          "areaTotal",
          "population",
          "regionCount",
          "establishmentYear",
          "nationalId",
          "distanceToGovernorate",
          "distanceToCapital",
          "elevation",
          "povertyRate",
          "unemploymentRate"
        ].map((name, idx) => (
          <div key={name} className="w-full sm:w-[48%] md:w-[23%]">
            <label className="block mb-1 text-sm text-gray-700">
              {[
                "مساحة التنظيم (كم2)",
                "مساحة المحافظة (كم2)",
                "المساحة الكلية للبلدية (كم2)",
                "عدد السكان في البلدية",
                "عدد المناطق (المدن والقرى) في البلدية",
                "سنة التأسيس",
                "الرقم الوطني للبلدية",
                "البعد عن مركز المحافظة (كم)",
                "البعد عن العاصمة (كم)",
                "الارتفاع عن سطح البحر (م)",
                "نسبة الفقر",
                "نسبة البطالة"
              ][idx]}</label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => <Input {...field} className="w-full" />}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button htmlType="submit" className="bg-green-600 text-white">لوحة المعلومات</Button>
      </div>
    </form>
  );
};

export default MunicipalityDataForm;
