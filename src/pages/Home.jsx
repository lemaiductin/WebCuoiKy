import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Hạng B1 - Xe số tự động",
      price: 12500000,
      duration: "3 tháng",
      image:
        "https://trungtamhoanggia.com/Images/Editor/images/HINH%20HG%20TAP%205(1).png",
      description: "Khóa học dành cho người mới bắt đầu, xe số tự động",
    },
    {
      id: 2,
      title: "Hạng B2 - Xe số sàn",
      price: 14500000,
      duration: "4 tháng",
      image:
        "https://truongdaylaixe.vn/wp-content/uploads/2021/07/bai-thi-sat-hach-bang-lai-xe-b2.jpg",
      description: "Khóa học nâng cao, hướng dẫn lái xe số sàn chuyên nghiệp",
    },
    {
      id: 3,
      title: "Hạng C - Xe tải",
      price: 18500000,
      duration: "5 tháng",
      image:
        "https://hoclaixeachau.edu.vn/wp-content/uploads/2023/11/bao-nhieu-tuoi-duoc-thi-bang-lai-xe-hang-c-1.jpeg",
      description: "Đào tạo lái xe tải với đội ngũ giảng viên kinh nghiệm",
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "Thầy Nguyễn Quốc chí",
      experience: "15 năm kinh nghiệm",
      rating: 4.9,
      students: 520,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3EAlaU-F9zsj2E9eggpyofVQTCYGNuyCapA&s",
    },
    {
      id: 2,
      name: "Cô Thu Hương",
      experience: "10 năm kinh nghiệm",
      rating: 4.8,
      students: 430,
      image:
        "https://img.lovepik.com/free-png/20211116/lovepik-teachers-educate-portraits-png-image_400965146_wh1200.png",
    },
    {
      id: 3,
      name: "Thầy Nguyễn Hồng Phúc",
      experience: "Không có kinh nghiệm",
      rating: 4.7,
      students: 380,
      image: "/public/images/Phucle.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Thị Hoa",
      course: "Hạng B1",
      comment:
        "Khóa học rất chất lượng, giảng viên nhiệt tình. Tôi đã thi đậu ngay lần đầu!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      course: "Hạng B2",
      comment:
        "Học phí hợp lý, thời gian đào tạo linh hoạt. Rất phù hợp với người đi làm.",
      rating: 4,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Phạm Minh Đức",
      course: "Hạng C",
      comment:
        "Đội ngũ giảng viên chuyên nghiệp, thiết bị dạy học hiện đại. Tôi rất hài lòng.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const stats = [
    { value: "5,200+", label: "Học viên đã đào tạo" },
    { value: "98%", label: "Tỷ lệ đỗ kỳ thi" },
    { value: "15+", label: "Năm kinh nghiệm" },
    { value: "25+", label: "Giảng viên chuyên nghiệp" },
  ];

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "Đội xe hiện đại",
      description:
        "Trang bị các dòng xe đời mới, bảo dưỡng thường xuyên, đảm bảo an toàn tối đa cho học viên.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Giảng viên kinh nghiệm",
      description:
        "Đội ngũ giảng viên có nhiều năm kinh nghiệm, kiên nhẫn và tận tâm, giúp học viên nắm vững kỹ năng.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Lịch học linh hoạt",
      description:
        "Đa dạng thời gian học, kể cả buổi tối và cuối tuần, phù hợp với mọi đối tượng học viên.",
    },
  ];

  const [activeTab, setActiveTab] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10 min-h-screen flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full"
          >
            <div className="max-w-4xl">
              <motion.div variants={itemVariants} className="mb-8">
                <span className="inline-block px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6">
                  TUYỂN SINH & KHAI GIẢNG LIÊN TỤC
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-red-300">KHOÁ HỌC</span>
                  <br />
                  <span className="text-white">LÁI XE</span>
                  <br />
                  <span className="text-yellow-300 text-6xl md:text-8xl">
                    Trung Lương
                  </span>
                </h1>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                    A1 - A2 - B1 - B2 - C
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 mb-12"
              >
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl shadow-2xl hover:bg-yellow-300 transition duration-300 text-lg"
                >
                  Đăng ký tư vấn
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition duration-300 text-lg backdrop-blur-sm"
                >
                  Xem khóa học
                </motion.button> */}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl leading-relaxed"
                >
                  Trung tâm đào tạo lái xe uy tín hàng đầu với đội ngũ giảng
                  viên chuyên nghiệp và cơ sở vật chất hiện đại
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-yellow-300">
                      Liên hệ ngay:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            📞
                          </span>
                        </div>
                        <span className="text-xl font-bold">0902.355.090</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            📱
                          </span>
                        </div>
                        <span className="text-xl font-bold">0905.603.996</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                      Học lái xe uy tín với giảng viên chuyên nghiệp
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            fill="#f9fafb"
          >
            <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tại sao chọn <span className="text-red-600">Trung Lương</span>?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Chúng tôi tự hào là trung tâm đào tạo lái xe uy tín với hơn 15 năm
              kinh nghiệm, cam kết mang đến chất lượng đào tạo tốt nhất
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Các khóa học đang <span className="text-red-600">cập nhật</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Đa dạng khóa học với nhiều hạng bằng lái, phù hợp với mọi nhu cầu
              của học viên từ cơ bản đến nâng cao
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {course.duration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <span className="text-sm text-gray-500 block">
                        Học phí
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        {course.price.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg"
                    >
                      Đăng ký ngay
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-red-500 text-red-600 font-bold rounded-xl hover:bg-red-50 transition duration-300 shadow-lg"
            >
              <a href="/courses"> Xem tất cả khóa học →</a>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Đội ngũ <span className="text-red-600">giảng viên</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Các giảng viên có nhiều năm kinh nghiệm trong lĩnh vực đào tạo lái
              xe, tận tâm và chuyên nghiệp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {instructor.name}
                </h3>
                <p className="text-red-600 font-medium mb-4">
                  {instructor.experience}
                </p>
                <div className="flex items-center justify-center text-yellow-500 mb-4">
                  <span className="mr-2 font-bold text-lg">
                    {instructor.rating}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(instructor.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Đã đào tạo{" "}
                  <span className="font-bold text-red-600">
                    {instructor.students}
                  </span>{" "}
                  học viên
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 font-semibold rounded-xl hover:from-red-200 hover:to-pink-200 transition-all duration-300 border border-red-200"
                >
                  Xem hồ sơ chi tiết
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400/20 rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Thành tựu <span className="text-yellow-300">ấn tượng</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-bold mb-3 text-yellow-300 drop-shadow-lg">
                  {stat.value}
                </div>
                <p className="text-lg md:text-xl font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Cảm nhận <span className="text-red-600">học viên</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hàng ngàn học viên đã thành công với khóa học của chúng tôi và đạt
              được bằng lái
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative"
              >
                <div className="absolute top-4 left-4 text-red-200 text-6xl font-serif leading-none">
                  "
                </div>
                <div className="flex items-center text-yellow-500 mb-6 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-8 italic text-lg leading-relaxed relative z-10">
                  {testimonial.comment}
                </p>
                <div className="flex items-center relative z-10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-red-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-red-500 font-medium">
                      Khóa học {testimonial.course}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
            >
              Xem thêm đánh giá →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute -right-32 -top-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto text-center text-white relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Sẵn sàng trở thành tài xế <br />
                  <span className="text-yellow-300">chuyên nghiệp?</span>
                </h2>
                <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
                  Đăng ký ngay hôm nay để nhận tư vấn miễn phí và ưu đãi đặc
                  biệt dành cho học viên mới
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-6"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-xl shadow-2xl hover:bg-yellow-300 transition-all duration-300 text-lg"
                >
                  🚗 Đăng ký ngay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
                >
                  📞 Tư vấn miễn phí
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">✅</div>
                  <p className="font-semibold">Đảm bảo đỗ</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">⏰</div>
                  <p className="font-semibold">Lịch linh hoạt</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">💰</div>
                  <p className="font-semibold">Giá cả hợp lý</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
