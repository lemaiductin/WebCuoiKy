import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MyCourseList = () => {
  const [courses, setCourses] = useState([]); // State lưu danh sách khóa học
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái tải dữ liệu
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/courses?populate=*"
        );
        const allCourses = response.data.data;

        if (isTeacher || isAdmin) {
          setCourses(allCourses);
        } else if (isUser) {
          const acceptedCourses = allCourses.filter((course) => {
            const regStatus = course.registrationStatus || {};
            return (
              regStatus[currentUser.id] === "accepted" ||
              regStatus[String(currentUser.id)] === "accepted"
            );
          });

          setCourses(acceptedCourses);
        }

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [currentUser]);

  if (loading) {
    return <p>Đang tải danh sách khóa học...</p>;
  }

  if (courses.length === 0) {
    return <p>Bạn chưa đăng ký khóa học nào.</p>;
  }

  const handleAddCourse = () => {
    navigate("/addCourse"); // Điều hướng đến form tạo khóa học
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Khóa học của tôi
        </h2>

        {/* Nút thêm khóa học chỉ hiển thị cho Teacher và Admin */}
        {(isTeacher || isAdmin) && (
          <div className="mb-6 text-right">
            <button
              onClick={handleAddCourse}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Thêm khóa học
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.documentId}
              className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => navigate(`/course-details/${course.documentId}`)}
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

                {isTeacher ||
                  (isAdmin && (
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/updateCourse/${course.documentId}`)
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Cập nhật
                      </button>
                      <button
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Bạn có chắc chắn muốn xóa khóa học này không?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `http://localhost:1337/api/courses/${course.documentId}`
                              );
                              alert("Khóa học đã được xóa thành công!");
                              setCourses(
                                courses.filter(
                                  (c) => c.documentId !== course.id
                                )
                              );
                            } catch (error) {
                              console.error("Lỗi khi xóa khóa học:", error);
                              alert(
                                "Không thể xóa khóa học. Vui lòng thử lại!"
                              );
                            }
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyCourseList;
