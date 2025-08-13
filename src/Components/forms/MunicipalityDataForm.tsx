import React from "react";
import { Button, Typography, Divider, message, Alert } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import DynamicInput from "./DynamicInput";
import { getAndRegisterEsriToken } from "../../Services/Auth/Token";
import {
  getAdminLevels,
  getPeriods,
  getConfigFields,
} from "../../Services/GetEsriData/risApi";
import type { DynField } from "../../Services/GetEsriData/risApi";
import { useContext } from "react";
import { SectorContext } from "../../Context/SectorsContext";

const { Title } = Typography;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i).map(
  (y) => ({ value: String(y), label: String(y) })
);

const MunicipalityDataForm: React.FC = () => {
  // ✅ read the selected sector from context
  const { selectedSector } = useContext(SectorContext);

  const methods = useForm({
    defaultValues: {
      governorate: "",
      municipality: "",
      year: String(currentYear),
      adminLevel: "",
      period: "",
      quarter: "",
      month: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;
  const adminLevel = watch("adminLevel");
  const period = watch("period");

  const needsQuarter = period === "3";
  const needsMonth = period === "2";

  const [token, setToken] = React.useState<string>("");
  const [adminLevelOptions, setAdminLevelOptions] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [periodOptions, setPeriodOptions] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [dynFields, setDynFields] = React.useState<DynField[]>([]);
  const [loadingConfig, setLoadingConfig] = React.useState(false);

  // Keep quarter/month in sync with "period"
  React.useEffect(() => {
    if (!needsQuarter) setValue("quarter", "");
    if (!needsMonth) setValue("month", "");
  }, [needsQuarter, needsMonth, setValue]);

  // Bootstrap: token + base selects
  React.useEffect(() => {
    (async () => {
      try {
        const info = await getAndRegisterEsriToken();
        if (!info?.token) {
          message.error("فشل الحصول على رمز الدخول");
          return;
        }
        setToken(info.token);

        const [levels, periods] = await Promise.all([
          getAdminLevels(info.token),
          getPeriods(info.token),
        ]);

        if (!levels.length || !periods.length) {
          message.error("فشل تحميل القيم الأساسية");
          return;
        }

        setAdminLevelOptions(levels);
        setPeriodOptions(periods);

        // defaults
        setValue("adminLevel", levels[0].value);
        const defaultPeriod =
          periods.find((p) => p.value === "4")?.value ?? periods[0].value;
        setValue("period", defaultPeriod);
      } catch {
        message.error("تعذر الإتصال بالخادم");
      }
    })();
  }, [setValue]);

  // Load dynamic fields whenever token/adminLevel/period/selectedSector changes
  React.useEffect(() => {
    if (!token || !adminLevel || !period || !selectedSector) {
      setDynFields([]);
      return;
    }

    let mounted = true;
    (async () => {
      setLoadingConfig(true);
      try {
        const fields = await getConfigFields(token, {
          adminLevel,
          period,
          sectorValue: selectedSector,
        });
        if (!mounted) return;
        if (!fields.length) {
          setDynFields([]);
          message.error("لا توجد حقول مطابقة للفلتر الحالي");
          return;
        }
        setDynFields(fields);

      } catch {
        if (!mounted) return;
        setDynFields([]);
        message.error("فشل تحميل الحقول الديناميكية");
      } finally {
        if (mounted) setLoadingConfig(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, adminLevel, period, selectedSector]);

  console.log(dynFields)

  const onSubmit = (_data: any) => {
    message.success("تم تجهيز البيانات");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-white rounded-xl shadow-lg space-y-6"
      >
        <Title level={4} className="text-green-700">
          شاشات ادخال البطاقة التعريفية
        </Title>

        {!selectedSector && (
          <Alert
            type="info"
            showIcon
            message="الرجاء اختيار القطاع من القائمة الجانبية لعرض الحقول المناسبة"
            className="mb-4"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DynamicInput
            inputType="select"
            name="governorate"
            title="المحافظة"
            options={[]}
            placeholder="—"
          />
          <DynamicInput
            inputType="select"
            name="municipality"
            title="البلدية"
            options={[]}
            placeholder="—"
          />
          <DynamicInput
            inputType="select"
            name="adminLevel"
            title="المستوى الإداري"
            options={adminLevelOptions}
            isRequired
          />
          <DynamicInput
            inputType="select"
            name="period"
            title="الفترة"
            options={periodOptions}
            isRequired
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DynamicInput
            inputType="select"
            name="year"
            title="السنة"
            options={yearOptions}
            isRequired
          />
          <DynamicInput
            inputType="select"
            name="quarter"
            title="الربع"
            options={Array.from({ length: 4 }, (_, i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
            disabled={!needsQuarter}
            isRequired={needsQuarter}
          />
          <DynamicInput
            inputType="select"
            name="month"
            title="الشهر"
            options={Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
            disabled={!needsMonth}
            isRequired={needsMonth}
          />
        </div>

        <div className="flex flex-row justify-around">
          <div className="flex items-end">
            <Button className="bg-green-600 text-white w-full truncate">
              تحميل البيانات من ملف اكسل
            </Button>
          </div>
          <div className="flex items-end">
            <Button className="bg-green-600 text-white w-full truncate">
              تصدير البيانات الى ملف اكسل
            </Button>
          </div>
          <div className="flex items-center">
            <Button htmlType="submit" className="bg-green-600 text-white">
              لوحة المعلومات
            </Button>
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dynFields.map((f) => (
            <DynamicInput
              key={f.name}
              inputType={f.type}
              name={f.name}
              title={`${f.title}:`}
              isRequired
            />
          ))}
        </div>

        {loadingConfig && (
          <div className="text-sm text-gray-500">جارٍ التحميل…</div>
        )}
      </form>
    </FormProvider>
  );
};

export default MunicipalityDataForm;
