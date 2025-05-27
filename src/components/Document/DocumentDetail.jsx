import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiDownload,
  FiPlus,
  FiFileText,
  FiCalendar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import DeleteContentDocument from "./DeleteContentDocument";
import AddNewContentDocument from "./AddNewContentDocument";
import { useParams } from "react-router-dom";
import { getDocumentDetail } from "../../api/auth.api";
import { BiTrash } from "react-icons/bi";
import { Menu } from "@headlessui/react";

const DocumentDetail = () => {
  const { docId } = useParams();
  const [documents, setDocuments] = useState(null);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  //phan quyen
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedFiles, setPaginatedFiles] = useState([]);

  useEffect(() => {
    fetchDocumentDetail();
    // eslint-disable-next-line
  }, [docId]);

  useEffect(() => {
    if (documents?.document_contents) {
      setTotalPages(
        Math.ceil(documents.document_contents.length / itemsPerPage)
      );
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setPaginatedFiles(
        documents.document_contents.slice(startIndex, endIndex)
      );
    }
  }, [documents, currentPage, itemsPerPage]);

  const fetchDocumentDetail = async () => {
    try {
      const response = await getDocumentDetail(docId);
      const documentData = response.data.data;
      setDocuments(documentData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tài liệu từ API:", error);
    }
  };

  const handleDeleteFile = (data) => {
    setDataToDelete(data);
    setShowDeleteModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-xl mt-8">
      {/* Document Info */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <FiFileText className="text-blue-600" size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
              {documents?.title}
            </h1>
            <p className="text-gray-500 text-base mb-2 max-w-xl">
              {documents?.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <span>Ngày tạo: {formatDate(documents?.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" />
                <span>Cập nhật: {formatTime(documents?.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
        {isTeacher && (
          <button
            onClick={() => setShowAddFileModal(true)}
            className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all font-semibold text-base"
          >
            <FiPlus className="mr-2" size={20} />
            Thêm tài liệu chi tiết
          </button>
        )}
      </div>

      {/* Files */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <FiFileText />
            Danh sách tài liệu
          </h2>
        </div>

        <div className="border border-blue-100 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white">
          {documents?.document_contents?.length > 0 ? (
            <>
              <ul className="divide-y divide-blue-100">
                {paginatedFiles.map((file) => (
                  <li
                    key={file?.id}
                    className="p-4 flex justify-between items-center hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 rounded-lg p-2 text-xl group-hover:bg-blue-200 transition-all">
                        <FiFileText className="text-blue-500" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-all">
                          {file?.file?.split("/").pop()}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full cursor-pointer hover:bg-blue-100 transition-all"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = `http://localhost:1337${file?.file}`;
                          link.download = `http://localhost:1337${file?.file}`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        title="Tải xuống"
                      >
                        <FiDownload size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 rounded-full cursor-pointer hover:bg-red-100 transition-all"
                        onClick={() => handleDeleteFile(file)}
                        title="Xóa"
                      >
                        <BiTrash size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              {documents?.document_contents.length > itemsPerPage && (
                <div className="border-t p-4 bg-white rounded-b-xl">
                  <div className="flex justify-center items-center space-x-1">
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-150 mr-1 ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                          : "text-blue-600 border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      <FiChevronLeft />
                    </button>

                    {/* Page numbers */}
                    <div className="hidden md:flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-150 ${
                              currentPage === page
                                ? "bg-blue-600 text-white border-blue-600"
                                : "text-blue-600 border-blue-200 hover:bg-blue-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    {/* Mobile page indicator */}
                    <span className="md:hidden text-sm text-gray-700">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-150 ml-1 ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                          : "text-blue-600 border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-10 flex flex-col items-center text-center text-gray-500">
              <svg
                width="70"
                height="70"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4"
              >
                <rect width="100%" height="100%" rx="16" fill="#e0e7ff" />
                <path d="M7 7h10v10H7z" fill="#3b82f6" />
                <path d="M9 9h6v6H9z" fill="#fff" />
              </svg>
              <div className="text-lg font-semibold mb-1">
                Chưa có tài liệu nào.
              </div>
              <div className="text-gray-400 text-sm">
                Hãy thêm tài liệu chi tiết cho khóa học này.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal thêm tài liệu */}
      {showAddFileModal && (
        <AddNewContentDocument
          onClose={() => setShowAddFileModal(false)}
          fetch={fetchDocumentDetail}
        />
      )}
      {dataToDelete && (
        <DeleteContentDocument
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={dataToDelete}
          fetch={fetchDocumentDetail}
        />
      )}
    </div>
  );
};

export default DocumentDetail;
