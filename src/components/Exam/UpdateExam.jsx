import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getExamDetail } from "../../api/auth.api";
import Toast from "../common/Toast";
import { FiEdit3 } from "react-icons/fi";

const UpdateExam = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchExam();
  }, [docId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchExam = async () => {
    try {
      setIsLoading(true);
      const response = await getExamDetail(docId);
      const examData = response.data.data;
      setForm({
        title: examData.title,
        description: examData.description,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tài liệu từ API:", error);
      setToast({ message: "Lỗi khi lấy thông tin bài tập.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:1337/api/exams/${docId}`, {
        data: form,
      });
      setToast({ message: "Cập nhật thành công!", type: "success" });
      setTimeout(() => navigate(-1), 1200);
    } catch (error) {
      setToast({ message: "Có lỗi xảy ra khi cập nhật.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="bg-green-100 p-4 rounded-full mb-2">
            <FiEdit3 className="text-green-600" size={36} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Chỉnh sửa bài tập
          </h1>
          <p className="text-gray-500 text-base">
            Cập nhật thông tin bài tập của bạn
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="animate-spin h-12 w-12 text-green-500 mb-4"
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
                <span className="text-green-600 font-semibold">
                  Đang tải dữ liệu...
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-base font-semibold text-gray-700 mb-1"
                  >
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-base"
                    placeholder="Nhập tiêu đề bài tập"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-base font-semibold text-gray-700 mb-1"
                  >
                    Nội dung bài tập <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    required
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-base min-h-[120px] resize-y"
                    placeholder="Nhập nội dung chi tiết bài tập..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                    disabled={isLoading}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-2.5 rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang cập nhật...
                      </span>
                    ) : (
                      <>
                        <FiEdit3 className="inline mr-2 -mt-1" size={20} />
                        Cập nhật
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
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

export default UpdateExam;
