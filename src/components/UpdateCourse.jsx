import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // Lấy thông tin khóa học hiện tại
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
        );
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
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học:", error);
      }
    };

    fetchCourse();
  }, [documentId]);

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
    try {
      let imageId = form.img;

      // Nếu có ảnh mới, upload ảnh trước
      if (imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);

        const uploadResponse = await axios.post(
          "http://localhost:1337/api/upload",
          formData
        );
        imageId = uploadResponse.data[0].id; // Lấy ID của ảnh sau khi upload
      }

      // Tìm ID thực tế của khóa học dựa trên documentId
      const response = await axios.get(
        `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}`
      );
      const courseId = response.data.data[0]?.documentId;

      if (!courseId) {
        alert("Không tìm thấy khóa học để cập nhật!");
        return;
      }
      // Gửi yêu cầu cập nhật khóa học
      await axios.put(`http://localhost:1337/api/courses/${courseId}`, {
        data: {
          ...form,
          img: imageId, // Gửi ID ảnh
        },
      });

      alert("Khóa học đã được cập nhật thành công!");
      navigate("/courseList"); // Quay lại danh sách khóa học
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học:", error);
      alert("Không thể cập nhật khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Cập nhật khóa học
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
          Cập nhật khóa học
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
