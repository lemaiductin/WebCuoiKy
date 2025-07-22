import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaIdCard,
  FaMoneyBillWave,
  FaFileAlt,
  FaGift,
  FaImage,
  FaArrowLeft,
  FaSave,
  FaCar,
} from "react-icons/fa";
import { createCourseWithImage, uploadCourse } from "../api/auth.api";

const CreateCourse = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    teacher_id: user.id,
    NameCourse: "",
    schedule: "",
    license_type: "",
    Tuition: "",
    content: "",
    preferential: "",
    img: null,
  });

  const [imageFile, setImageFile] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Lưu file ảnh được chọn
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form :", form);
    try {
      let imageId = null;

      // Nếu có ảnh, upload ảnh trước
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);

        const uploadResponse = await uploadCourse(formData);
        imageId = uploadResponse.data[0].id; // Lấy URL ảnh sau khi upload
      }

      // Gửi dữ liệu khóa học cùng URL ảnh
      const response = await createCourseWithImage(form, imageId);
      console.log("sdfsf :", form, user.id);
      console.log("Khóa học đã được tạo:", response);
      alert("Khóa học đã được tạo thành công!");
      navigate("/courseList"); // Quay lại danh sách khóa học
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      alert("Không thể tạo khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/courseList")}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Quay lại danh sách khóa học</span>
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
              <FaGraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Tạo khóa học mới
            </h1>
            <p className="text-gray-600 text-lg">
              Thiết lập thông tin chi tiết cho khóa học lái xe của bạn
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FaCar className="mr-3" />
              Thông tin khóa học
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Tên khóa học */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaGraduationCap className="mr-2 text-red-500" />
                    Tên khóa học *
                  </label>
                  <input
                    type="text"
                    name="NameCourse"
                    value={form.NameCourse}
                    onChange={handleChange}
                    placeholder="Ví dụ: Khóa học lái xe B2 cơ bản"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </motion.div>

                {/* Lịch trình */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaCalendarAlt className="mr-2 text-red-500" />
                    Lịch trình *
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={form.schedule}
                    onChange={handleChange}
                    placeholder="Ví dụ: Thứ 2, 4, 6 - 7:00-9:00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                </motion.div>

                {/* Loại bằng */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaIdCard className="mr-2 text-red-500" />
                    Loại bằng lái *
                  </label>
                  <select
                    name="license_type"
                    value={form.license_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  >
                    <option value="">Chọn loại bằng lái</option>
                    <option value="A1">Bằng A1 - Xe máy dưới 175cc</option>
                    <option value="A2">Bằng A2 - Xe máy trên 175cc</option>
                    <option value="B1">Bằng B1 - Xe ô tô dưới 9 chỗ</option>
                    <option value="B2">Bằng B2 - Xe ô tô và xe tải nhỏ</option>
                    <option value="C">Bằng C - Xe tải và xe khách</option>
                    <option value="D">Bằng D - Xe máy kéo</option>
                    <option value="E">Bằng E - Xe có rơ moóc</option>
                  </select>
                </motion.div>

                {/* Học phí */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaMoneyBillWave className="mr-2 text-red-500" />
                    Học phí (VNĐ) *
                  </label>
                  <input
                    type="number"
                    name="Tuition"
                    value={form.Tuition}
                    onChange={handleChange}
                    placeholder="Ví dụ: 5000000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    required
                  />
                  {form.Tuition && (
                    <p className="text-sm text-gray-500 mt-2">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(form.Tuition)}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Nội dung khóa học */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaFileAlt className="mr-2 text-red-500" />
                    Nội dung khóa học *
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Mô tả chi tiết về nội dung, chương trình học, kỹ năng sẽ được đào tạo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                    required
                  />
                </motion.div>

                {/* Ưu đãi */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaGift className="mr-2 text-red-500" />
                    Ưu đãi đặc biệt
                  </label>
                  <textarea
                    name="preferential"
                    value={form.preferential}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Các chương trình khuyến mãi, ưu đãi cho học viên..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  />
                </motion.div>

                {/* Ảnh khóa học */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FaImage className="mr-2 text-red-500" />
                    Ảnh đại diện khóa học
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <FaImage className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        {imageFile ? imageFile.name : "Chọn ảnh để tải lên"}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF tối đa 10MB
                      </span>
                    </label>
                  </div>
                  {imageFile && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center">
                        <FaImage className="mr-2" />
                        Đã chọn: {imageFile.name}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/courseList")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaSave className="w-4 h-4" />
                  <span>Tạo khóa học</span>
                </button>
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FaGraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">
                Chất lượng đào tạo
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Đảm bảo chương trình đào tạo chất lượng cao với đội ngũ giảng viên
              giàu kinh nghiệm
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FaCalendarAlt className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">
                Lịch học linh hoạt
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Sắp xếp lịch học phù hợp với thời gian của học viên, tối ưu hóa
              hiệu quả học tập
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <FaIdCard className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Tỷ lệ đậu cao</h3>
            </div>
            <p className="text-sm text-gray-600">
              Cam kết tỷ lệ đậu cao với phương pháp giảng dạy hiệu quả và hỗ trợ
              tận tình
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default CreateCourse;
