import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadMaterials = () => {
  const { courseId } = useParams(); // Lấy courseId từ URL
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    upload: null,
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/documents?filters[course][id][$eq]=${courseId}&populate=*`
        );
        setMaterials(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy tài liệu:", error);
      }
    };

    fetchMaterials();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.file) {
      alert("Vui lòng chọn một tệp để tải lên.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("files.Upload", form.file);
      formData.append(
        "data",
        JSON.stringify({
          title: form.title,
          description: form.description,
          course: courseId,
        })
      );

      await axios.post("http://localhost:1337/api/documents", formData);
      alert("Tài liệu đã được tải lên thành công!");
      setForm({ title: "", description: "", file: null });
      const response = await axios.get(
        `http://localhost:1337/api/documents?filters[course][id][$eq]=${courseId}&populate=*`
      );
      setMaterials(response.data.data); // Cập nhật danh sách tài liệu
    } catch (error) {
      console.error("Lỗi khi tải lên tài liệu:", error);
      alert("Không thể tải lên tài liệu. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        {isTeacher ? "Quản lý tài liệu khóa học" : "Tài liệu khóa học"}
      </h2>

      {/* Hiển thị danh sách tài liệu */}
      <div className="mb-6">
        {materials.length === 0 ? (
          <p>Không có tài liệu nào cho khóa học này.</p>
        ) : (
          <ul>
            {materials.map((material) => (
              <li key={material.id} className="mb-4">
                <h3 className="text-lg font-bold">
                  {material.attributes.title}
                </h3>
                <p className="text-gray-600">
                  {material.attributes.description}
                </p>
                <a
                  href={`http://localhost:1337${material.attributes.Upload.data.attributes.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Tải xuống
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form upload tài liệu (chỉ hiển thị cho Teacher) */}
      {isTeacher && (
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Tên tài liệu</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Chọn tài liệu</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tải lên
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadMaterials;
