import React from "react";
import { Button, Divider, Modal } from "antd";
import type { CustomModalProps } from "../../Core/types/ModalProps";

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onCancel,
  title = "Basic Modal",
  children,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      closable
      footer={
        <div className="flex justify-center">
          <Button onClick={onCancel} type="default">
            إلغاء
          </Button>
        </div>
      }
    >
      <Divider />
      {children}
      <Divider />
    </Modal>
  );
};

export default CustomModal;
