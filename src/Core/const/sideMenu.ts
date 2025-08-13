// sectors.ts
export type SectorDef = { name: string; group_number?: string };
export type SectorMap = Record<string, SectorDef>;

const sectorsMap: SectorMap = {
  Health: { name: "الصحة" },
  Education: { name: "التعليم" },
  Population: { name: "السكان", group_number: "6" },
  Tourism: { name: "السياحة" },
  General: { name: "البطاقة التعريفية", group_number: "3" },
  Vocational: { name: "خدمات المهن وعقود الإيجار" },
  Regulation: { name: "خدمات التنظيم" },
  Construction: { name: "الأعمال الانشائية والصيانة" },
  Environment: { name: "الصحة العامة والبيئة", group_number: "2" },
  Communication: { name: "العلاقة مع المجتمع المحلي" },
  RevenuesExpenses: { name: "الإيرادات", group_number: "1" },
  Expenses: { name: "النفقات", group_number: "1" },
  InvestmentFixedAssets: { name: "الاستثمار" },
  FixedAssets: { name: "البيانات الرئيسية", group_number: "5" },
  ITTraining: { name: "التدريب و تكنولوجيا المعلومات", group_number: "3" },
  MunicipalCouncil: { name: "المجلس البلدي", group_number: "3" },
  HumanResInstitutionalDev: { name: "الموارد البشرية و التطوير المؤسسي", group_number: "3" },
  EnergyMun: { name: "بيانات الطاقة" },
  DevUnitData: { name: "بيانات وحدة التنمية", group_number: "3" },
  AidLoan: { name: "بيانات القروض و المساعدات", group_number: "1" },
  Climate: { name: "بيانات المناخ", group_number: "2" },
  Garden: { name: "بيانات الحدائق", group_number: "2" },
  CreditRating: { name: "تقييم الأداء المؤسسي", group_number: "4" },
  EvaOperationPerformance: { name: "تقييم الأداء التشغيلي", group_number: "4" },
  EvaLocalDevLocal: { name: "تقييم عوامل التنمية المحلية", group_number: "4" },
  FinancialSolidity: { name: "القدرة المالية", group_number: "4" },
  DetailedExpenses: { name: "بيانات النفقات التفصيلية", group_number: "1" },
  DetailedRevenues: { name: "بيانات الإيرادات التفصيلية", group_number: "1" },
  Garbage: { name: "النفايات", group_number: "2" },
  Disabilities: { name: "الأشخاص ذوي الإعاقة", group_number: "6" },
};

export default sectorsMap;
