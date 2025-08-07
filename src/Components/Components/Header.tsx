import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import CustomSidebar from "./CustomSidebar";
import logo from "../../Assets/images/bankLogo2.png";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-green-600 text-white h-[10vh] flex items-center px-4">
      <Row
        className="w-full items-center"
        justify="space-between"
        align="middle"
      >
        <Col xs={24} sm={8} className="flex  items-center justify-start gap-10">
          <div className="flex items-center gap-2">
            <MenuOutlined
              className="cursor-pointer text-xl hover:text-yellow-300"
              onClick={() => setSidebarOpen(true)}
            />
            <Link
              to="/"
              className="text-white hover:text-yellow-300 font-medium text-sm"
            >
              بنك تنمية المدن والقرى- نظام المرصد التنموي
            </Link>
          </div>
        </Col>

        {/* Center: Logo */}
        <Col xs={24} sm={8} className="flex justify-center align-middle">
          <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-20 h-20 object-contain"
              />
            
          </div>
        </Col>

        
        <Col xs={24} sm={8} className="flex items-center justify-end gap-3">
          <div className="flex items-end justify-end gap-2">
            <span className="cursos-pointer hover:text-yellow-300 sm:inline text-sm">
              أهلا وسهلا .. مسؤول بلديات
            </span>
            <span>|</span>
            <Link to="">
              <LogoutOutlined className="cursor-pointer hover:text-yellow-300" />
            </Link>
          </div>
        </Col>
      </Row>
      <CustomSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}

export default Header;
