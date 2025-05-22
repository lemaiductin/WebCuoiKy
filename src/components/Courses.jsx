import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/courses?populate=*"
        );
        setCourses(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleRegisterCourse = async (courseId) => {
    if (!currentUser) {
      alert("Bạn phải đăng nhập tài khoản để tiếp tục!");
      navigate("/login");
      return;
    }

    try {
      console.log("currentUser:", currentUser);
      await axios.put(`http://localhost:1337/api/courses/${courseId}`, {
        data: {
          registrationStatus: {
            ...courses.find((course) => course.documentId === courseId)
              ?.registrationStatus,
            [currentUser.id]: "pending", // Thêm trạng thái đăng ký cho User
          },
        },
      });
      alert("Đăng ký khóa học thành công! Vui lòng chờ phê duyệt của Teacher.");
    } catch (error) {
      console.error("Lỗi khi đăng ký khóa học:", error);
      alert("Không thể đăng ký khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Danh sách khóa học
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.documentId}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <img
              src={
                course.img
                  ? `http://localhost:1337${course.img[0].url}`
                  : "https://via.placeholder.com/300x200"
              }
              alt={course.NameCourse || "Khóa học"}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {course.NameCourse}
              </h3>
              <p className="text-gray-600">{course.description}</p>
              <button
                onClick={() => handleRegisterCourse(course.documentId)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
