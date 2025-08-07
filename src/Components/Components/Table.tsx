import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Indicator {
  id: number;
  name: string;
  gisField: string;
  level: string;
  period: string;
  addType: string;
  status: string;
}

interface IndicatorsTableProps {
  data: Indicator[];
  onEdit?: (item: Indicator) => void;
  onDelete?: (item: Indicator) => void;
}

const IndicatorTable: React.FC<IndicatorsTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "GisField",
      dataIndex: "gisField",
      key: "gisField",
    },
    {
      title: "المستوى",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "الفترة",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "نوع عملية الاضافة",
      dataIndex: "addType",
      key: "addType",
    },
    {
      title: "فعال / غير فعال",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "تعديل",
      key: "edit",
      render: (_:any, record: Indicator) => (
        <Button icon={<EditOutlined />} onClick={() => onEdit?.(record)} />
      ),
    },
    {
      title: "حذف",
      key: "delete",
      render: (_:any, record: Indicator) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete?.(record)} />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={false}
    />
  );
};

export default IndicatorTable;
