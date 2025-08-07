import React from "react";

import {
  UsergroupAddOutlined,
  PlusSquareOutlined,
  BookOutlined,
  EditOutlined,
  TrademarkOutlined,
  ToolOutlined,
  CloudOutlined,
  PhoneOutlined,
  DollarOutlined,
  FileTextOutlined,
  FundOutlined,
  FieldNumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Drawer, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PlusSquareOutlined />,
    label: "البيانات العامة للبلدية",
    children: [
      {
        key: "2",
        icon: <UsergroupAddOutlined />,
        label: "السكان الديموغرافيا و المساحة",
      },
      {
        key: "3",
        icon: <PlusSquareOutlined />,
        label: "الصحة",
      },
      {
        key: "4",
        icon: <BookOutlined />,
        label: "التعليم",
      },
      {
        key: "5",
        icon: <EditOutlined />,
        label: "خدمات المهن وعقود الإيجار",
      },
      {
        key: "6",
        icon: <TrademarkOutlined />,
        label: "خدمات التنظيم",
      },
      {
        key: "7",
        icon: <ToolOutlined />,
        label: "الأعمال الإنشائية والصيانة",
      },
    ],
  },

  {
    key: "8",
    icon: <CloudOutlined />,
    label: "البيئة و المناخ",
    children: [
      {
        key: "9",
        icon: <PhoneOutlined />,
        label: "العلاقة مع المجتمع المحلي",
      },
    ],
  },

  {
    key: "10",
    icon: <DollarOutlined />,
    label: "البيانات المالية",
    children: [
      {
        key: "11",
        icon: <FileTextOutlined />,
        label: "الاستثمار",
      },
      {
        key: "12",
        icon: <FieldNumberOutlined />,
        label: "الوصول الذاتي",
      },
      {
        key: "13",
        icon: <ThunderboltOutlined />,
        label: "بيانات الطاقة",
      },
    ],
  },
];


const onClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

interface CustomSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer
      title="القائمة"
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}

    >
      <Menu
        onClick={onClick}
        mode="inline"
        items={items}
        className="break-words whitespace-normal"
      />
    </Drawer>
  );
}

export default CustomSidebar;
