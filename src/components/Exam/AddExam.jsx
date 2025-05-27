import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../common/Toast";
import { FiFilePlus } from "react-icons/fi";

export const AddExam = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { documentId } = useParams();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1337/api/exams", {
        data: {
          courseId: documentId,
          title,
          description,
        },
      });
      console.log("data", res);
      setToast({ message: "Thêm tài liệu mới thành công!", type: "success" });
      setTimeout(() => {
        navigate(`/course-details/${documentId}`);
      }, 1200);
    } catch (error) {
      console.error("Lỗi khi thêm tài liệu:", error);
      setToast({ message: "Thêm tài liệu thất bại", type: "error" });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-8 relative">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-green-100 p-4 rounded-full mb-2">
          <FiFilePlus className="text-green-600" size={36} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1 text-center">
          📝 Thêm bài tập mới
        </h2>
        <p className="text-gray-500 text-sm text-center">
          Điền thông tin để thêm bài tập vào khóa học
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-green-500 transition-colors text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Nhập tiêu đề bài tập"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Mô tả
          </label>
          <textarea
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-green-500 transition-colors text-base min-h-[90px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả (không bắt buộc)"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-bold text-lg shadow-md hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all"
        >
          <FiFilePlus className="inline mr-2 -mt-1" size={20} />
          Thêm bài tập
        </button>
      </form>
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
