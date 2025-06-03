import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiTrash2, FiEye, FiFileText, FiClock } from "react-icons/fi";
import { FileUp } from "lucide-react";
import Toast from "../common/Toast";

const ExamList = () => {
  const { documentId } = useParams();
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamlist = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/exams`);
        const examData = response.data.data;
        const examOfCourse = examData.filter(
          (doc) => doc.courseId === documentId
        );
        setExam(examOfCourse);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bài tập từ API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamlist();
  }, [documentId]);

  const handleAddExam = () => {
    navigate(`/course-details/${documentId}/createExam`);
  };

  const handleDelete = async (examId) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa bài tập này không?"
    );
    if (!confirmed) return;

    setDeletingId(examId);

    try {
      await axios.delete(`http://localhost:1337/api/exams/${examId}`);
      // Immediately update UI without waiting for reload
      setExam((prevExams) =>
        prevExams.filter((exam) => exam.documentId !== examId)
      );
      // Show success message
      setToast({ message: "Bài tập được xóa thành công!", type: "success" });
    } catch (error) {
      console.error("Lỗi khi xóa bài tập:", error);
      setToast({ message: "Không thể xóa bài tập, thử lại!", type: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiFileText className="text-green-600" />
            Danh sách bài tập
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các bài tập của khóa học</p>
        </div>
        {(isTeacher || isAdmin) && (
          <button
            onClick={handleAddExam}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <FiPlus className="mr-2" />
            Thêm bài tập
          </button>
        )}
      </div>

      {exam.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center border border-dashed border-gray-300">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Chưa có bài tập nào
          </h3>
          <p className="mt-2 text-gray-500">
            Bắt đầu bằng cách thêm bài tập mới
          </p>
          {(isTeacher || isAdmin) && (
            <button
              onClick={handleAddExam}
              className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Thêm bài tập
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-4 text-left text-sm font-medium text-gray-700">
            <div className="col-span-7">Bài tập</div>
            <div className="col-span-3">Ngày tạo</div>
            <div className="col-span-2 text-right">Thao tác</div>
          </div>

          <div className="divide-y divide-gray-200">
            {exam.map((e) => (
              <div
                key={e.documentId}
                className={`hover:bg-gray-50 transition-colors ${
                  deletingId === e.documentId ? "opacity-50" : ""
                }`}
              >
                <div className="grid grid-cols-12 px-6 py-4 items-center">
                  <div className="col-span-7 flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <FiFileText className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {e.title}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center text-sm text-gray-600">
                    <FiClock className="mr-2 text-gray-400" />
                    {formatDate(e.createdAt)}
                  </div>

                  <div className="col-span-2 flex justify-end space-x-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/course-details/${documentId}/exams/${e.documentId}`
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Xem chi tiết"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/UpdateExam/${e.documentId}`)}
                      className="text-purple-600 hover:text-red-800 transition-colors"
                      title="Cập nhật"
                    >
                      <FileUp className="h-5 w-5" />
                    </button>
                    {isTeacher && (
                      <button
                        onClick={() => handleDelete(e.documentId)}
                        disabled={deletingId === e.documentId}
                        className={`text-red-600 hover:text-red-800 transition-colors ${
                          deletingId === e.documentId
                            ? "opacity-50 cursor-wait"
                            : ""
                        }`}
                        title="Xóa"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ExamList;
