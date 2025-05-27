import React, { useState } from "react";
import { deleteExamContent } from "../../api/auth.api";
import Toast from "../common/Toast";

const DeleteContentExam = ({ show, onClose, data, fetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteExamContent(data.documentId);
      setToast({ message: "Xóa tài liệu thành công!", type: "success" });
    } catch (error) {
      setToast({ message: "Xóa tài liệu thất bại!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận xóa tài liệu ?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tài liệu này không? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => onClose()}
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => {
                setToast(null);
                if (toast.type === "success") {
                  onClose();
                  fetch();
                }
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DeleteContentExam;
