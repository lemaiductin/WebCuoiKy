import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ExamList from "./Exam/ExamList";
import DocumentList from "./Document/DocumentList";
import MemberList from "./Member/MemberList";
import SubmissionList from "./GradesStudent/SubmisssionList";
import Header from "./Header";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaIdCard,
  FaMoneyBillWave,
  FaUser,
  FaFileAlt,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaClock,
  FaAward,
  FaBook,
  FaChevronRight,
  FaPhoneAlt,
  FaEnvelope,
  FaCar,
} from "react-icons/fa";
import { getCoursesDetail } from "../api/course.api";
import { getUserList } from "../api/auth.api";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        console.log("documentId từ URL:", documentId);

        // Fetch course details
        const response = await getCoursesDetail(documentId);
        const courseData = response.data.data[0];
        setCourse(courseData);

        // Fetch teacher information if teacher_id exists
        if (courseData?.teacher_id) {
          try {
            const usersResponse = await getUserList();
            const teacherData = usersResponse.data.find(
              (user) => user.id === courseData.teacher_id
            );
            setTeacher(teacherData);
            console.log("Teacher data:", teacherData);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin giảng viên:", error);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học từ API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [documentId]);

  const tabs = [
    {
      id: "description",
      label: "Mô tả khóa học",
      icon: FaFileAlt,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "document",
      label: "Tài liệu",
      icon: FaBook,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "exam",
      label: "Bài tập",
      icon: FaClipboardList,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      id: "member",
      label: "Học viên",
      icon: FaUsers,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
          />
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-red-400 mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Không tìm thấy khóa học
            </h2>
            <p className="text-gray-600">
              Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-rose-700 py-16">
          <div className="absolute inset-0 bg-black/20"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Course Image */}
              {course?.img?.data && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="lg:w-1/3"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <img
                      src={`http://localhost:1337${course.img.data[0].url}`}
                      alt={course.img.data[0].name}
                      className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </motion.div>
              )}

              {/* Course Info */}
              <div className="lg:w-2/3 text-white">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="flex items-center mb-4">
                    <FaGraduationCap className="text-3xl mr-3" />
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                      Khóa học lái xe
                    </span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {course.NameCourse}
                  </h1>

                  {/* Quick Info Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <FaCalendarAlt className="text-2xl mx-auto mb-2" />
                      <div className="text-sm opacity-90">Lịch trình</div>
                      <div className="font-semibold text-sm">
                        {course.schedule}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <FaIdCard className="text-2xl mx-auto mb-2" />
                      <div className="text-sm opacity-90">Loại bằng</div>
                      <div className="font-semibold text-sm">
                        {course.license_type}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <FaMoneyBillWave className="text-2xl mx-auto mb-2" />
                      <div className="text-sm opacity-90">Học phí</div>
                      <div className="font-semibold text-sm">
                        {new Intl.NumberFormat("vi-VN").format(course.Tuition)}{" "}
                        đ
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <FaStar className="text-2xl mx-auto mb-2 text-yellow-300" />
                      <div className="text-sm opacity-90">Đánh giá</div>
                      <div className="font-semibold text-sm">4.8/5 ⭐</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Instructor Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
              <div className="flex items-center text-white">
                <FaUser className="text-2xl mr-3" />
                <h2 className="text-2xl font-bold">Thông tin giảng viên</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-400 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                      {teacher?.avatar ? (
                        <img
                          src={`http://localhost:1337${teacher.avatar}`}
                          alt="Teacher Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                          <FaUser className="text-3xl text-red-500" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1">
                    <FaAward className="text-sm" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {teacher ? (
                      <span>
                        {teacher.firstName && teacher.lastName
                          ? `${teacher.firstName} ${teacher.lastName}`
                          : teacher.username || "Giảng viên"}
                      </span>
                    ) : (
                      "Đang tải thông tin giảng viên..."
                    )}
                  </h3>
                  <p className="text-red-600 font-semibold mb-2">
                    {teacher?.qualification || "Giảng viên chuyên nghiệp"}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {teacher?.bio ||
                      teacher?.description ||
                      "Giảng viên có nhiều năm kinh nghiệm trong lĩnh vực đào tạo lái xe, cam kết mang đến cho học viên những kiến thức và kỹ năng tốt nhất."}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {teacher?.email && (
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="mr-2 text-red-500" />
                        <span className="text-sm">{teacher.email}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-red-500" />
                      <span className="text-sm">Kinh nghiệm đào tạo</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaUsers className="mr-2 text-red-500" />
                      <span className="text-sm">
                        Giảng viên tại DriveAcademy
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {teacher?.email && (
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center transition-colors">
                      <FaEnvelope className="mr-2" />
                      Liên hệ
                    </button>
                  )}
                  <button className="border border-red-500 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg flex items-center transition-colors">
                    <FaPhoneAlt className="mr-2" />
                    Tư vấn
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 py-6 px-4 text-center font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? `${tab.color} bg-gradient-to-r ${tab.bgColor} border-b-4 border-current`
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <tab.icon className="text-xl" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
              >
                {activeTab === "description" && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="bg-red-100 p-3 rounded-xl mr-4">
                        <FaFileAlt className="text-2xl text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Giới thiệu khóa học
                        </h3>
                        <p className="text-gray-600">
                          Thông tin chi tiết về nội dung và mục tiêu khóa học
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {course.content ||
                          "Khóa học lái xe chuyên nghiệp được thiết kế để cung cấp cho học viên những kiến thức lý thuyết vững chắc và kỹ năng thực hành cần thiết để trở thành một tài xế an toàn và có trách nhiệm. Chương trình đào tạo được xây dựng theo tiêu chuẩn quốc gia với đội ngũ giảng viên giàu kinh nghiệm."}
                      </p>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 text-center">
                          <FaClock className="text-2xl text-red-500 mx-auto mb-2" />
                          <div className="font-semibold text-gray-800">
                            Thời gian
                          </div>
                          <div className="text-gray-600">30-45 ngày</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center">
                          <FaBook className="text-2xl text-pink-500 mx-auto mb-2" />
                          <div className="font-semibold text-gray-800">
                            Lý thuyết
                          </div>
                          <div className="text-gray-600">40 tiết</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 text-center">
                          <FaCar className="text-2xl text-rose-500 mx-auto mb-2" />
                          <div className="font-semibold text-gray-800">
                            Thực hành
                          </div>
                          <div className="text-gray-600">60 tiết</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "document" && <DocumentList />}
                {activeTab === "exam" && <ExamList course={course} />}
                {activeTab === "member" && <MemberList />}
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center transition-all transform hover:scale-105 shadow-lg">
              <FaGraduationCap className="mr-2" />
              Đăng ký ngay
              <FaChevronRight className="ml-2" />
            </button>
            <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-semibold flex items-center transition-all">
              <FaPhoneAlt className="mr-2" />
              Tư vấn thêm
            </button>
            <button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center transition-all transform hover:scale-105 shadow-lg">
              <FaUsers className="mr-2" />
              Xem học viên
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
