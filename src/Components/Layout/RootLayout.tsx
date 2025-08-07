import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../Components/Header";


const { Sider, Content } = Layout;

const RootLayout = () => {

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Header />
      <Layout>
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
