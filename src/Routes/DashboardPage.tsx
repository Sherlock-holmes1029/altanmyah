import DashboardLayout from '../Components/Layout/DashboardLayout'
import MunicipalityDataForm from '../Components/forms/MunicipalityDataForm'

const DashboardPage = () => {
  return (
     <DashboardLayout
      tabLabels={[
        "البيانات العامة",
        "السكان والديموغرافيا",
        "الصحة",
        "التعليم",
        "البنية التحتية",
        "النقل",
      ]}
    >
      <div> <MunicipalityDataForm /> </div>
      <div>محتوى السكان والديموغرافيا</div>
      <div>محتوى الصحة</div>
      <div>محتوى التعليم</div>
      <div>محتوى البنية التحتية</div>
      <div>محتوى النقل</div>
    </DashboardLayout>
  )
}

export default DashboardPage