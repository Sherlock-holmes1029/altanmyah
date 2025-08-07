import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  tabLabels: string[]; // 👈 pass custom tab titles
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, tabLabels }) => {
  const onChange = (key: string) => {
    console.log("Selected Tab:", key);
  };

  const childArray = React.Children.toArray(children);

  // Dynamically generate tabs based on tabLabels and children
  const items: TabsProps["items"] = tabLabels.map((label, index) => ({
    key: `${index + 1}`,
    label,
    children: childArray[index] || <div>لا يوجد محتوى</div>,
  }));

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={items}
      onChange={onChange}
    />
  );
};

export default DashboardLayout;
