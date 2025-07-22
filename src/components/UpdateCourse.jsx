import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  FaEdit,
  FaSpinner,
} from "react-icons/fa";
import Toast from "./common/Toast";
import { getCoursesByDocumentId, uploadCourse } from "../api/auth.api";

const UpdateCourse = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    NameCourse: "",
    schedule: "",
    license_type: "",
    Tuition: "",
    content: "",
    preferential: "",
    img: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Lấy thông tin khóa học hiện tại
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCoursesByDocumentId(documentId);
        const courseData = response.data.data[0];
        if (courseData) {
          setForm({
            NameCourse: courseData.NameCourse,
            schedule: courseData.schedule,
            license_type: courseData.license_type,
            Tuition: courseData.Tuition,
            content: courseData.content,
            preferential: courseData.preferential,
            img: courseData.img || null, // Lấy ID ảnh nếu có
          });
        } else {
          console.error("Không tìm thấy khóa học với documentId:", documentId);
          setToast({ message: "không tìm thấy khóa học.", type: "error" });
          navigate("/courseList");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
        setToast({ message: "Lỗi khi tải thông tin khóa học.", type: "error" });
        navigate("/courseList");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [documentId, navigate]);

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Lưu file ảnh được chọn
  };

  // Xử lý cập nhật khóa học
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageId = form.img;

      // Nếu có ảnh mới, upload ảnh trước
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);

        const uploadResponse = await uploadCourse(formData);
        imageId = uploadResponse.data[0].id; // Lấy ID của ảnh sau khi upload
      }

      // Tìm ID thực tế của khóa học dựa trên documentId
      const response = await axios.get(
        `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}`
      );
      const courseId = response.data.data[0]?.documentId;

      if (!courseId) {
        setToast({ message: "Không tìm thấy khóa học để cập nhật." });
        return;
      }
      // Gửi yêu cầu cập nhật khóa học
      await axios.put(`http://localhost:1337/api/courses/${courseId}`, {
        data: {
          ...form,
          img: imageId, // Gửi ID ảnh
        },
      });

      setToast({ message: "Khóa học cập nhật thành công.", type: "success" });
      setTimeout(() => {
        navigate("/courseList");
      }, 1200); // Quay lại danh sách khóa học
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error);
      setToast({ message: "Không thể cập nhật khóa học.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Đang tải thông tin khóa học...
          </p>
        </div>
      </div>
    );
  }

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
              <FaEdit className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Cập nhật khóa học
            </h1>
            <p className="text-gray-600 text-lg">
              Chỉnh sửa thông tin chi tiết cho khóa học lái xe
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

                  {/* Current Image Display */}
                  {form.img && !imageFile && (
                    <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700 flex items-center">
                        <FaImage className="mr-2" />
                        Ảnh hiện tại đã được tải lên
                      </p>
                    </div>
                  )}

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
                        {imageFile
                          ? imageFile.name
                          : "Chọn ảnh mới để thay đổi"}
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
                        Ảnh mới đã chọn: {imageFile.name}
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
                  disabled={submitting}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Đang cập nhật...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4" />
                      <span>Cập nhật khóa học</span>
                    </>
                  )}
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
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <FaEdit className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Cập nhật dễ dàng</h3>
            </div>
            <p className="text-sm text-gray-600">
              Chỉnh sửa thông tin khóa học một cách nhanh chóng và thuận tiện
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FaSave className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Lưu tự động</h3>
            </div>
            <p className="text-sm text-gray-600">
              Hệ thống tự động lưu và đồng bộ thông tin ngay lập tức
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <FaGraduationCap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Quản lý hiệu quả</h3>
            </div>
            <p className="text-sm text-gray-600">
              Theo dõi và quản lý khóa học một cách chuyên nghiệp
            </p>
          </div>
        </motion.div>
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

export default UpdateCourse;
