import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../Components/Header";
import CustomSidebar2 from "../Components/CustomSidebar2";
import { useContext } from "react";
import CustomSidebar from "../Components/CustomSidebar";
import { SidebarContext } from "../../Context/SidebarContext";

const { Content } = Layout;

const RootLayout = () => {
  const {screenType}=useContext(SidebarContext)

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Header />
      <Layout>
        {screenType == "mobile" ? <CustomSidebar/> : <CustomSidebar2/> }
        <Content
          style={{
            padding: "16px",
            height: "calc(90vh)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
