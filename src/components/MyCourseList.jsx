import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Clock,
  DollarSign,
  Edit,
  Trash2,
  Plus,
  GraduationCap,
  Calendar,
  Eye,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import Header from "./Header";
import { getAllRequestStudentRegisterCourse } from "../api/course.api";
import {
  deleteCourse,
  getCourseList,
  getCoursesDetail,
  getUserList,
} from "../api/auth.api";

const MyCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [studentOfCourse, setStudentOfCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, courseRes] = await Promise.all([
          getUserList(),
          getCourseList(),
        ]);
        setUsers(userRes.data);
        let allCourses = courseRes.data.data;
        console.log("course-img", courseRes);

        // Chỉ admin và teacher mới thấy tất cả khóa học
        if (isTeacher || isAdmin) {
          setCourses(allCourses);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);
  // isTeacher, isAdmin, isUser, currentUser

  useEffect(() => {
    fetchAllStudentOfCourse();
  }, []);

  const fetchCourseDetailById = async (course_documentId) => {
    try {
      const res = await getCoursesDetail(course_documentId);
      console.log("course-documentid", res);
      return res.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khóa học:", error);
      return null;
    }
  };

  const fetchAllStudentOfCourse = async () => {
    try {
      const res = await getAllRequestStudentRegisterCourse();
      const studentOfCourse = res.data.data.filter(
        (item) => item.student_id === currentUser.id && item.status_id === 2
      );
      const combinedData = await Promise.all(
        studentOfCourse.map(async (request) => {
          const courseData = await fetchCourseDetailById(request.course_id);
          return {
            request,
            courseData,
          };
        })
      );
      setStudentOfCourse(combinedData);
      console.log("Kết quả gộp:", combinedData);
      return combinedData;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      return [];
    }
  };
  const getUserNameById = (userId) => {
    const user = users.find((u) => u.id === parseInt(userId));
    return user ? user.username : `ID: ${userId}`;
  };

  const handleAddCourse = () => {
    navigate("/addCourse");
  };

  const handleDeleteCourse = async (course) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      try {
        // Thử các endpoint có thể có
        const possibleEndpoints = ["student-courses", "my-requests"];

        let requestsResponse = null;
        let workingEndpoint = null;

        for (const endpoint of possibleEndpoints) {
          try {
            console.log(`Thử endpoint: ${endpoint}`);
            requestsResponse = await axios.get(
              `http://localhost:1337/api/${endpoint}?filters[course_id][$eq]=${course.documentId}&populate=*`
            );
            workingEndpoint = endpoint;
            console.log(`Endpoint ${endpoint} hoạt động!`);
            break;
          } catch (err) {
            console.log(
              `Endpoint ${endpoint} không hoạt động:`,
              err.response?.status
            );
            continue;
          }
        }

        if (requestsResponse && requestsResponse.data.data.length > 0) {
          console.log(
            `Tìm thấy ${requestsResponse.data.data.length} đăng ký liên quan với endpoint: ${workingEndpoint}`
          );

          // Xóa từng request một
          for (const request of requestsResponse.data.data) {
            try {
              await axios.delete(
                `http://localhost:1337/api/${workingEndpoint}/${request.documentId}`
              );
              console.log(`Đã xóa student-course: ${request.documentId}`);
            } catch (deleteErr) {
              console.error(
                `Lỗi khi xóa student-course ${request.documentId}:`,
                deleteErr
              );
            }
          }
        } else {
          console.log(
            "Không tìm thấy đăng ký liên quan hoặc không có endpoint nào hoạt động"
          );
        }

        // Bước 2: Kiểm tra course có tồn tại không trước khi xóa
        console.log("Kiểm tra course tồn tại...");
        try {
          await getCoursesDetail(course.documentId);
          console.log("Course tồn tại, đang xóa...");

          // Xóa course
          await deleteCourse(course.documentId);
          alert("Khóa học và tất cả đăng ký liên quan đã được xóa thành công!");
          setCourses(courses.filter((c) => c.documentId !== course.documentId));
        } catch (courseErr) {
          if (courseErr.response?.status === 404) {
            console.log("Course đã được xóa trước đó, chỉ cập nhật UI");
            alert("Khóa học đã được xóa!");
            setCourses(
              courses.filter((c) => c.documentId !== course.documentId)
            );
          } else {
            throw courseErr;
          }
        }
      } catch (error) {
        console.error("Lỗi khi xóa khóa học:", error);
        alert(
          `Có lỗi xảy ra: ${
            error.response?.data?.error?.message || error.message
          }`
        );
      }
    }
  };

  // Filter courses based on search - sử dụng logic khác nhau cho user và teacher/admin
  const filteredCourses = isUser
    ? studentOfCourse
        .filter(
          (item) =>
            item.courseData?.data?.NameCourse?.toLowerCase().includes(
              searchTerm.toLowerCase()
            ) ||
            item.courseData?.data?.content
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .map((item) => item.courseData?.data) // Lấy courseData.data từ studentOfCourse
        .filter(Boolean) // Loại bỏ các giá trị null/undefined
    : courses.filter(
        (course) =>
          course.NameCourse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Đang tải danh sách khóa học...
            </p>
          </div>
        </div>
      </>
    );
  }

  // Kiểm tra empty state dựa trên role
  const isEmpty = isUser ? studentOfCourse.length === 0 : courses.length === 0;

  if (isEmpty) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto"
            >
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Chưa có khóa học nào
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                {isTeacher || isAdmin
                  ? "Hãy tạo khóa học đầu tiên để bắt đầu hành trình giảng dạy!"
                  : "Hãy đăng ký một khóa học để bắt đầu hành trình học tập!"}
              </p>
              {(isTeacher || isAdmin) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddCourse}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tạo khóa học mới</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📚 Khóa học của tôi
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                {isTeacher || isAdmin
                  ? "Quản lý và theo dõi các khóa học bạn đã tạo"
                  : "Các khóa học bạn đã đăng ký thành công"}
              </p>
              <div className="flex justify-center items-center space-x-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-semibold">
                    {isUser ? studentOfCourse.length : courses.length} khóa học
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-semibold">
                    {isTeacher || isAdmin ? "Giảng viên" : "Học viên"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="flex-1 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-red-500 text-white shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-red-500 text-white shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Add Course Button */}
                {(isTeacher || isAdmin) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddCourse}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Thêm khóa học</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <AnimatePresence>
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredCourses.map((studentOfCourse, index) => (
                    <motion.div
                      key={studentOfCourse.documentId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 overflow-hidden"
                    >
                      {/* Course Image */}
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={
                            studentOfCourse.img
                              ? `http://localhost:1337${studentOfCourse.img[0].url}`
                              : "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&h=300&auto=format&fit=crop"
                          }
                          alt={studentOfCourse.NameCourse || "Khóa học"}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-110 cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/course-details/${studentOfCourse.documentId}`
                            )
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {studentOfCourse.license_type || "Khóa học"}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            navigate(
                              `/course-details/${studentOfCourse.documentId}`
                            )
                          }
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Eye className="w-6 h-6" />
                        </motion.button>
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3
                          className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 cursor-pointer transition-colors line-clamp-2"
                          onClick={() =>
                            navigate(
                              `/course-details/${studentOfCourse.documentId}`
                            )
                          }
                        >
                          {studentOfCourse.NameCourse}
                        </h3>

                        <div className="flex items-center mb-3 text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          <span>
                            Giảng viên:{" "}
                            {getUserNameById(studentOfCourse.teacher_id)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-red-600 font-bold">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>
                              {studentOfCourse.Tuition
                                ? `${new Intl.NumberFormat("vi-VN").format(
                                    studentOfCourse.Tuition
                                  )} VNĐ`
                                : "Miễn phí"}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {studentOfCourse.schedule || "Linh hoạt"}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {isTeacher || isAdmin ? (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                navigate(
                                  `/updateCourse/${studentOfCourse.documentId}`
                                )
                              }
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-md"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Sửa</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleDeleteCourse(studentOfCourse)
                              }
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Xóa</span>
                            </motion.button>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(
                                `/course-details/${studentOfCourse.documentId}`
                              )
                            }
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>Xem chi tiết</span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.documentId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex">
                        {/* Image */}
                        <div className="w-48 h-32 flex-shrink-0">
                          <img
                            src={
                              course.img
                                ? `http://localhost:1337${course.img[0].url}`
                                : "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&h=300&auto=format&fit=crop"
                            }
                            alt={course.NameCourse || "Khóa học"}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() =>
                              navigate(`/course-details/${course.documentId}`)
                            }
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  {course.license_type || "Khóa học"}
                                </span>
                              </div>

                              <h3
                                className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-red-600 transition-colors"
                                onClick={() =>
                                  navigate(
                                    `/course-details/${course.documentId}`
                                  )
                                }
                              >
                                {course.NameCourse}
                              </h3>

                              <div className="flex items-center mb-2 text-sm text-gray-600">
                                <GraduationCap className="w-4 h-4 mr-2" />
                                <span>
                                  Giảng viên:{" "}
                                  {getUserNameById(course.teacher_id)}
                                </span>
                              </div>

                              <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center text-red-600 font-bold">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  <span>
                                    {course.Tuition
                                      ? `${new Intl.NumberFormat(
                                          "vi-VN"
                                        ).format(course.Tuition)} VNĐ`
                                      : "Miễn phí"}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>
                                    {course.schedule || "Lịch linh hoạt"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 ml-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  navigate(
                                    `/course-details/${course.documentId}`
                                  )
                                }
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>

                              {(isTeacher || isAdmin) && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      navigate(
                                        `/updateCourse/${course.documentId}`
                                      )
                                    }
                                    className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                                    title="Chỉnh sửa"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDeleteCourse(course)}
                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    title="Xóa khóa học"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results */}
            {filteredCourses.length === 0 && searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  Không tìm thấy khóa học
                </h3>
                <p className="text-gray-500">
                  Không có khóa học nào phù hợp với từ khóa "{searchTerm}"
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default MyCourseList;
