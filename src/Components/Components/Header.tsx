import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import logo from "../../Assets/images/bankLogo2.png";
import { SidebarContext } from "../../Context/SidebarContext";
import { useContext } from "react";

function Header() {
  const {open,setOpen} = useContext(SidebarContext)

  return (
    <div className="bg-(--color-greenPrime) text-white h-[10vh] flex items-center px-4">
      <Row
        className="w-full items-center"
        justify="space-between"
        align="middle"
        wrap={false}
      >
        <Col xs={8} sm={8} className="flex  items-center justify-start gap-10">
          <div className="flex items-center gap-2">
            <MenuOutlined
              className="cursor-pointer text-xl hover:text-yellow-300"
              onClick={()=>setOpen(!open)}
            />
            <Link
              to="/"
              className=" hidden sm:inline text-white hover:text-yellow-300 font-medium text-sm"
            >
              بنك تنمية المدن والقرى- نظام المرصد التنموي
            </Link>
          </div>
        </Col>

        <Col xs={8} sm={8} className="flex justify-center align-middle">
          <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-20 h-20 object-contain"
              />
            
          </div>
        </Col>

        
        <Col xs={8} sm={8} className="flex items-center justify-end gap-3">
          <div className="flex items-end justify-end gap-2">
            <span className="hidden cursos-pointer hover:text-yellow-300 sm:inline text-sm">
              أهلا وسهلا .. مسؤول بلديات
            </span>
            <span className="hidden sm:inline" >|</span>
            <Link to="">
              <LogoutOutlined className="cursor-pointer hover:text-yellow-300" />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
