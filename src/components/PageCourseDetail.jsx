import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { studentRegisterCourses } from "../api/course.api";
import { User } from "lucide-react";

const PageCourseDetail = () => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const [course, setCourse] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = !currentUser?.roleUser || currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  const fetchTeacherInfo = async (teacherId) => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/users/${teacherId}`
      );
      setTeacher(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin giáo viên:", error);
    }
  };

  useEffect(() => {
    const fetchPageCourseDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
        );
        const courseData = response.data.data[0];
        setCourse(courseData);

        // Fetch teacher info if teacher_id exists
        if (courseData?.teacher_id) {
          await fetchTeacherInfo(courseData.teacher_id);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khóa học từ API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageCourseDetails();
  }, [documentId]);

  const handleRegisterCourse = async () => {
    if (!currentUser) {
      alert("Bạn phải đăng nhập tài khoản để tiếp tục!");
      // navigate("/login");
      return;
    }
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn đăng ký khóa học này không?"
    );
    if (!isConfirmed) {
      return;
    }
    try {
      const payload = {
        student_id: currentUser.id,
        teacher_id: course.teacher_id,
        course_id: course.documentId,
        status_id: 1,
      };
      const res = await studentRegisterCourses(payload);
      console.log("sss", res);

      alert("Đăng ký khóa học thành công! Vui lòng chờ phê duyệt.");
    } catch (error) {
      console.error("Lỗi khi đăng ký khóa học:", error);
      alert("Không thể đăng ký khóa học. Vui lòng thử lại!");
    }
  };
  const faqs = [
    {
      question: "Tôi cần chuẩn bị những gì khi bắt đầu khóa học?",
      answer:
        "Bạn cần chuẩn bị: CMND/CCCD bản gốc, giấy khám sức khỏe, 4 ảnh 3x4 (áo có cổ, nền trắng). Trung tâm sẽ hỗ trợ bạn hoàn thiện hồ sơ đăng ký.",
    },
    {
      question: "Lịch học có thể thay đổi được không?",
      answer:
        "Có, bạn có thể thay đổi lịch học trước 24h khi có việc đột xuất. Chúng tôi sẽ sắp xếp buổi học bù vào thời gian phù hợp với bạn.",
    },
    {
      question: "Sau bao lâu thì được thi sát hạch?",
      answer:
        "Sau khi hoàn thành khóa học (3 tháng), bạn sẽ được đăng ký thi sát hạch trong vòng 1-2 tuần tiếp theo tùy vào lịch thi của Sở GTVT.",
    },
    {
      question: "Nếu không đạt có được học lại miễn phí không?",
      answer:
        "Nếu không đạt phần thi nào (lý thuyết hoặc thực hành), bạn sẽ được học lại miễn phí phần đó và chỉ phải đóng lệ phí thi lại theo quy định.",
    },
  ];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl font-semibold text-gray-700">
              Đang tải thông tin khóa học...
            </p>
            <p className="text-gray-500 mt-2">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md"
          >
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Không tìm thấy khóa học
            </h2>
            <p className="text-gray-600 mb-8">
              Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              ← Quay lại trang trước
            </motion.button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          {course?.img?.data && (
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover opacity-30"
                src={`http://localhost:1337${course.img.data[0].url}`}
                alt={course.img.data[0].name}
              />
            </div>
          )}
          <div className="relative container mx-auto px-4 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-bold rounded-full text-sm mb-4">
                  🎓 Khóa học chất lượng cao
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {course.NameCourse}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
                Khóa học lái xe {course.license_type} chất lượng cao với tỷ lệ
                đậu 98%
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="font-semibold">⭐ Tỷ lệ đậu 98%</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="font-semibold">
                    👨‍🏫 Giảng viên chuyên nghiệp
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <span className="font-semibold">🚗 Xe đời mới</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Course Info */}
              <div className="lg:w-2/3">
                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                  <div className="border-b border-gray-200">
                    <nav className="flex">
                      {[
                        { id: "overview", name: "Tổng quan", icon: "📋" },
                        {
                          id: "curriculum",
                          name: "Chương trình học",
                          icon: "📚",
                        },
                        { id: "instructors", name: "Giáo viên", icon: "👨‍🏫" },
                        { id: "faq", name: "FAQ", icon: "❓" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-4 text-sm font-medium transition-all duration-300 ${
                            activeTab === tab.id
                              ? "border-b-2 border-red-500 text-red-600 bg-red-50"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span>{tab.icon}</span>
                          <span className="hidden sm:inline">{tab.name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-8">
                    {/* Tab Content */}
                    {activeTab === "overview" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                          Giới thiệu khóa học
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                          Khóa học lái xe {course.license_type} được thiết kế
                          bài bản giúp học viên nắm vững kiến thức lý thuyết và
                          kỹ năng thực hành lái xe an toàn. Chúng tôi cam kết
                          đào tạo chất lượng với đội ngũ giáo viên giàu kinh
                          nghiệm.
                        </p>

                        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 mb-8 border border-red-100">
                          <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                            <span className="mr-3">🎯</span>
                            Lợi ích khi tham gia
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              "Học lái với xe đời mới, đảm bảo an toàn",
                              "Giáo trình đào tạo chuẩn Bộ GTVT",
                              "Lịch học linh hoạt, có thể đổi buổi khi cần",
                              "Hỗ trợ đăng ký thi sát hạch",
                            ].map((benefit, index) => (
                              <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <span className="text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          Thông tin chi tiết
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {[
                            {
                              icon: "⏰",
                              label: "Thời lượng",
                              value: "3 tháng (12 tuần học)",
                            },
                            {
                              icon: "📅",
                              label: "Lịch học",
                              value: course.schedule,
                            },
                            {
                              icon: "🎖️",
                              label: "Bằng lái",
                              value: course.license_type,
                            },
                            {
                              icon: "💰",
                              label: "Học phí",
                              value: `${new Intl.NumberFormat("vi-VN").format(
                                course.Tuition
                              )} VNĐ`,
                            },
                          ].map((info, index) => (
                            <div
                              key={index}
                              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                            >
                              <div className="flex items-center mb-3">
                                <span className="text-2xl mr-3">
                                  {info.icon}
                                </span>
                                <span className="font-semibold text-gray-800">
                                  {info.label}
                                </span>
                              </div>
                              <p className="text-gray-700 font-medium">
                                {info.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "curriculum" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                          Chương trình đào tạo
                        </h2>

                        <div className="space-y-8">
                          <div className="bg-blue-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                              <span className="mr-3">📖</span>
                              Phần lý thuyết
                            </h3>
                            <div className="space-y-6">
                              {[
                                {
                                  title: "Luật giao thông đường bộ",
                                  duration: "8 buổi học",
                                  desc: "Hệ thống báo hiệu đường bộ, quy tắc giao thông và xử lý tình huống",
                                },
                                {
                                  title: "Cấu tạo xe và sửa chữa cơ bản",
                                  duration: "4 buổi học",
                                  desc: "Cấu tạo xe ô tô và cách xử lý các sự cố thường gặp",
                                },
                                {
                                  title: "Đạo đức người lái xe",
                                  duration: "2 buổi học",
                                  desc: "Văn hóa giao thông và trách nhiệm của người điều khiển phương tiện",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start bg-white rounded-xl p-6 shadow-sm"
                                >
                                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <span className="text-blue-600 font-bold">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-gray-900">
                                        {item.title}
                                      </h4>
                                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                        {item.duration}
                                      </span>
                                    </div>
                                    <p className="text-gray-600">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-green-50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                              <span className="mr-3">🚗</span>
                              Phần thực hành
                            </h3>
                            <div className="space-y-6">
                              {[
                                {
                                  title: "Lái xe trong sân tập",
                                  duration: "6 buổi",
                                  desc: "Các kỹ năng cơ bản: đề pa, dừng xe, lùi xe, ghép ngang, đỗ xe",
                                },
                                {
                                  title: "Lái xe đường trường",
                                  duration: "6 buổi",
                                  desc: "Tập lái trên các tuyến đường từ đơn giản đến phức tạp",
                                },
                                {
                                  title: "Thi thử",
                                  duration: "2 buổi",
                                  desc: "Thi thử theo đúng quy trình sát hạch của Bộ GTVT",
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start bg-white rounded-xl p-6 shadow-sm"
                                >
                                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <span className="text-green-600 font-bold">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-bold text-gray-900">
                                        {item.title}
                                      </h4>
                                      <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                        {item.duration}
                                      </span>
                                    </div>
                                    <p className="text-gray-600">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "instructors" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                          Giáo viên phụ trách
                        </h2>

                        {teacher ? (
                          <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-6">
                              <div className="w-20 h-20 rounded-full overflow-hidden mr-6 border-4 border-red-100 bg-red-100 flex items-center justify-center">
                                {/* icon  */}
                                <User className="w-10 h-10 text-red-500" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-gray-800">
                                  {teacher.username}
                                </h3>
                                <p className="text-red-600 font-medium text-lg">
                                  Giáo viên hướng dẫn
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  📧 Email:
                                </h4>
                                <p className="text-gray-600">{teacher.email}</p>
                              </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                              <p className="text-gray-700 leading-relaxed">
                                <strong>
                                  {teacher.fullname || teacher.username}
                                </strong>{" "}
                                sẽ là giáo viên hướng dẫn cho khóa học này. Giáo
                                viên có kinh nghiệm trong việc đào tạo lái xe và
                                sẽ đồng hành cùng bạn trong suốt quá trình học.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                            <div className="w-16 h-16 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">
                              Đang tải thông tin giáo viên...
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "faq" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                          Câu hỏi thường gặp
                        </h2>

                        <div className="space-y-4">
                          {faqs.map((faq, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                              <button
                                onClick={() =>
                                  setOpenFaqIndex(
                                    openFaqIndex === index ? null : index
                                  )
                                }
                                className="w-full flex justify-between items-center p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                              >
                                <span className="font-semibold text-gray-800 pr-4">
                                  {faq.question}
                                </span>
                                <svg
                                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                    openFaqIndex === index ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                              {openFaqIndex === index && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="p-6 bg-white border-t border-gray-200"
                                >
                                  <p className="text-gray-700 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Registration Card */}
              <div className="lg:w-1/3">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        <span className="mr-3">🎓</span>
                        Đăng ký khóa học
                      </h3>
                    </div>
                    <div className="p-8">
                      <div className="space-y-6 mb-8">
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                          <span className="text-gray-700 font-medium">
                            Học phí:
                          </span>
                          <span className="text-2xl font-bold text-red-600">
                            {new Intl.NumberFormat("vi-VN").format(
                              course.Tuition
                            )}{" "}
                            VNĐ
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              Thời gian học:
                            </span>
                            <span className="font-semibold">
                              {course.schedule}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Loại bằng:</span>
                            <span className="font-semibold">
                              {course.license_type}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Thời lượng:</span>
                            <span className="font-semibold">3 tháng</span>
                          </div>
                        </div>
                      </div>

                      {(isUser || isAdmin) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRegisterCourse}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg"
                        >
                          Đăng ký ngay
                        </motion.button>
                      )}

                      {!currentUser && (
                        <div className="text-center space-y-4">
                          <p className="text-gray-600">
                            Bạn cần đăng nhập để đăng ký khóa học
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/login")}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-lg"
                          >
                            🔐 Đăng nhập
                          </motion.button>
                        </div>
                      )}

                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <span className="mr-2">📞</span>
                          Hỗ trợ tư vấn
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl mr-3">📱</span>
                            <span className="text-gray-700 font-medium">
                              0902.355.090
                            </span>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl mr-3">✉️</span>
                            <span className="text-gray-700 font-medium">
                              support@trungluong.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PageCourseDetail;
