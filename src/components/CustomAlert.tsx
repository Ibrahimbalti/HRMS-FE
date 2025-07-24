import React, { useEffect } from "react";
import { Alert } from "antd";

interface TopAlertProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  description?: string;
  onClose: () => void;
  duration?: number; // in milliseconds
}

const CustomAlert: React.FC<TopAlertProps> = ({
  type,
  message,
  description,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "fit-content",
        maxWidth: "90%",
      }}
    >
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon
        closable
        onClose={onClose}
      />
    </div>
  );
};

export default CustomAlert;
