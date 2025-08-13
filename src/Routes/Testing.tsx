import { useEffect, useState } from "react";
import IndicatorsTable from "../Components/Components/Table";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { Button } from "antd";
import AddNewProcessModal from "../Components/Components/AddNewProcessModal";
import getEsriData from "../Services/GetEsriData/getEsriData";

const dummyData = [
  {
    id: 1,
    name: "نسبة مساحة التنظيم الى مساحة البلدية",
    gisField: "Field_D_2",
    level: "بلدية",
    period: "سنوي",
    addType: "مؤشر فقط",
    status: "فعال",
  },
  {
    id: 2,
    name: "الكثافة السكانية (نسمة/كم2)",
    gisField: "Field_D_3",
    level: "بلدية",
    period: "سنوي",
    addType: "مؤشر فقط",
    status: "فعال",
  },
  {
    id: 3,
    name: "نسبة الفقر",
    gisField: "Field_D_4",
    level: "بلدية",
    period: "سنوي",
    addType: "مؤشر و بيان",
    status: "فعال",
  },
  {
    id: 4,
    name: "نسبة البطالة",
    gisField: "Field_D_5",
    level: "بلدية",
    period: "سنوي",
    addType: "مؤشر و بيان",
    status: "فعال",
  },
];

function Testing() {
  const handleEdit = (item: any) => {
    console.log("Edit clicked:", item);
  };

  const handleDelete = (item: any) => {
    console.log("Delete clicked:", item);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  useEffect(()=>{
    async function batat() {
       const data= await getEsriData("https://tanmiah.jo/arcgis/rest/services/RIS_DataEntry_Service/FeatureServer/43")
    }
    batat()
  },[])

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="mb-4 w-[60%]">
        <Button color="green" variant="solid" onClick={openModal}>إضافة مؤشر</Button>
      </div>
      <div>
        <DashboardLayout tabLabels={["قائمة المؤشرات","قائمة البيانات","قائمة بيانات تفصيلية"]}>
          <div className="p-6 bg-[#f9f9f0] border-2 border-amber-200 rounded-2xl  w-full">
            <h2 className="text-center text-xl font-bold mb-6">
              قائمة مؤشرات البطاقة التعريفية
            </h2>
            <IndicatorsTable
              data={dummyData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </DashboardLayout>
      </div>
       <AddNewProcessModal open={isModalOpen} onCancel={closeModal} title="إضافة عملية جديدة" />
    </div>
  );
}

export default Testing;
