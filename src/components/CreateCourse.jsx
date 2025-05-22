import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { img } from "framer-motion/client";

const CreateCourse = () => {
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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Lưu file ảnh được chọn
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageId = null;

      // Nếu có ảnh, upload ảnh trước
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);

        const uploadResponse = await axios.post(
          "http://localhost:1337/api/upload",
          formData
        );
        imageId = uploadResponse.data[0].id; // Lấy URL ảnh sau khi upload
      }

      // Gửi dữ liệu khóa học cùng URL ảnh
      const response = await axios.post("http://localhost:1337/api/courses", {
        data: {
          ...form,
          img: imageId, // Gửi URL ảnh
        },
      });
      console.log("Khóa học đã được tạo:", response);
      alert("Khóa học đã được tạo thành công!");
      navigate("/courseList"); // Quay lại danh sách khóa học
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      alert("Không thể tạo khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Thêm khóa học mới
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Tên khóa học</label>
          <input
            type="text"
            name="NameCourse"
            value={form.NameCourse}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Lịch trình</label>
          <input
            type="text"
            name="schedule"
            value={form.schedule}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Loại bằng</label>
          <input
            type="text"
            name="license_type"
            value={form.license_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Học phí</label>
          <input
            type="number"
            name="Tuition"
            value={form.Tuition}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Nội dung</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Ưu đãi</label>
          <textarea
            name="preferential"
            value={form.preferential}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Ảnh khóa học</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Thêm khóa học
        </button>
      </form>
    </div>
  );
};
export default CreateCourse;
