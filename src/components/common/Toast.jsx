import React, { useEffect, useState } from "react";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheck className="text-green-600" />;
      case "error":
        return <FiX className="text-red-600" />;
      case "warning":
        return <FiAlertCircle className="text-yellow-600" />;
      default:
        return <FiCheck className="text-green-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      default:
        return "text-green-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[100] transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${getBgColor()} border rounded-lg p-4 shadow-lg max-w-sm`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3">
            <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className={`inline-flex rounded-md p-1.5 ${getTextColor()} hover:bg-opacity-20 hover:bg-current focus:outline-none`}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose && onClose(), 300);
              }}
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
