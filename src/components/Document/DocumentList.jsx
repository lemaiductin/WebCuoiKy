import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiFileText,
  FiPlus,
  FiTrash2,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import { Repeat } from "lucide-react";
import Toast from "../common/Toast";

const DocumentList = () => {
  const { documentId } = useParams();
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocumentlist = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/documents`);
        const documentData = response.data.data;
        const documentOfCourse = documentData.filter(
          (doc) => doc.courseId === documentId
        );
        setDocument(documentOfCourse);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài liệu từ API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentlist();
  }, [documentId]);

  const handleAddDocument = () => {
    navigate(`/course-details/${documentId}/createDocument`);
  };

  const handleDelete = async (documentId) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa tài liệu này không?"
    );
    if (!confirmed) return;
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/documents/${documentId}`
      );
      setToast({
        message: "Tài liệu đã được xóa thành công!",
        type: "success",
      });
      setDocument((prevDocs) =>
        prevDocs.filter((doc) => doc.documentId !== documentId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa tài liệu:", error);
      setToast({
        message: "Không thể xóa tài liệu. Vui lòng thử lại!",
        type: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg
          className="animate-spin h-12 w-12 text-blue-500 mb-4"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-blue-600 font-semibold">Đang tải dữ liệu...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FiFileText className="text-blue-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
              Danh sách tài liệu
            </h1>
            <div className="flex gap-2 mt-1">
              {isAdmin && (
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">
                  Admin
                </span>
              )}
              {isTeacher && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                  Teacher
                </span>
              )}
              {isUser && (
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-semibold">
                  User
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1 text-sm">
              Quản lý tài liệu học tập của bạn
            </p>
          </div>
        </div>
        {(isTeacher || isAdmin) && (
          <button
            onClick={handleAddDocument}
            className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold text-base"
          >
            <FiPlus className="mr-2" size={20} />
            Tài liệu chi tiết
          </button>
        )}
      </div>

      {document.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-12 text-center border border-dashed border-blue-200 flex flex-col items-center">
          <svg
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto mb-4"
          >
            <rect width="100%" height="100%" rx="16" fill="#e0e7ff" />
            <path d="M7 7h10v10H7z" fill="#3b82f6" />
            <path d="M9 9h6v6H9z" fill="#fff" />
          </svg>
          <h3 className="mt-2 text-xl font-bold text-gray-900">
            Chưa có tài liệu nào
          </h3>
          <p className="mt-2 text-gray-500 text-base">
            Bắt đầu bằng cách thêm tài liệu mới
          </p>
          {(isTeacher || isAdmin) && (
            <button
              onClick={handleAddDocument}
              className="mt-6 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold text-base"
            >
              <FiPlus className="mr-2" size={20} />
              Thêm tài liệu
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-blue-50 px-6 py-4 text-left text-sm font-bold text-blue-700">
            <div className="col-span-7">Tài liệu</div>
            <div className="col-span-3">Ngày tạo</div>
            <div className="col-span-2 text-right">Thao tác</div>
          </div>

          <div className="divide-y divide-gray-100">
            {document.map((doc) => (
              <div
                key={doc.documentId}
                className="hover:bg-blue-50 transition-all group"
              >
                <div className="grid grid-cols-12 px-6 py-4 items-center">
                  <div className="col-span-7 flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-all">
                      <FiFileText className="h-5 w-5" />
                    </div>
                    <div className="ml-2">
                      <div className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-all">
                        {doc.title}
                      </div>
                      {doc.description && (
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {doc.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center text-sm text-gray-600">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {formatDate(doc.createdAt)}
                  </div>

                  <div className="col-span-2 flex justify-end space-x-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/course-details/${documentId}/document/${doc.documentId}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Xem chi tiết"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/UpdateDocument/${doc.documentId}`)
                      }
                      className="text-purple-600 hover:text-red-800 transition-colors"
                      title="Cập nhật"
                    >
                      <Repeat className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.documentId)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Xóa"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
