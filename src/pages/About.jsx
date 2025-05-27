import React from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaCheckCircle,
  FaUserTie,
  FaCalendarAlt,
  FaTrophy,
  FaHandshake,
  FaRoad,
  FaLightbulb,
} from "react-icons/fa";
import Header from "../components/Header";

const About = () => {
  // Mock data
  const stats = [
    {
      icon: FaUsers,
      number: "15,000+",
      label: "Học viên đã tốt nghiệp",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaGraduationCap,
      number: "98%",
      label: "Tỷ lệ đậu lái xe",
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaCar,
      number: "50+",
      label: "Xe tập lái hiện đại",
      color: "from-red-500 to-red-600",
    },
    {
      icon: FaAward,
      number: "25+",
      label: "Năm kinh nghiệm",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "An toàn tuyệt đối",
      description:
        "Cam kết đảm bảo an toàn 100% cho học viên trong quá trình học",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FaClock,
      title: "Linh hoạt thời gian",
      description: "Lịch học linh hoạt, phù hợp với mọi đối tượng học viên",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FaUserTie,
      title: "Giảng viên chuyên nghiệp",
      description: "Đội ngũ giảng viên giàu kinh nghiệm, tận tâm với học viên",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: FaRoad,
      title: "Đường luyện tập chuẩn",
      description:
        "Hệ thống đường luyện tập đạt chuẩn quốc gia, đầy đủ biển báo",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: FaTrophy,
      title: "Chất lượng hàng đầu",
      description: "Được công nhận là trung tâm đào tạo chất lượng cao",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: FaLightbulb,
      title: "Phương pháp hiện đại",
      description: "Áp dụng công nghệ và phương pháp giảng dạy tiên tiến",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const team = [
    {
      name: "Nguyễn Văn Minh",
      position: "Giám đốc trung tâm",
      experience: "15 năm kinh nghiệm",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      specialties: ["Quản lý", "Đào tạo", "Tư vấn"],
    },
    {
      name: "Mai Đình Ý",
      position: "Trưởng phòng đào tạo",
      experience: "10 năm kinh nghiệm",
      avatar: "/public/images/MaiDinhY.jpg",
      specialties: ["Lý thuyết", "An toàn", "Luật giao thông"],
    },
    {
      name: "Lê Đức Thành",
      position: "Giảng viên thực hành",
      experience: "10 năm kinh nghiệm",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      specialties: ["Lái xe số sàn", "Lái xe số tự động", "Đỗ xe"],
    },
    {
      name: "Phạm Minh Tâm",
      position: "Giảng viên thực hành",
      experience: "8 năm kinh nghiệm",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      specialties: ["Lái xe địa hình", "Lái xe đường trường", "Kỹ thuật lái"],
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Thị Lan",
      content:
        "Trung tâm rất chuyên nghiệp, giảng viên tận tâm. Tôi đã học và thi đậu một cách dễ dàng.",
      rating: 5,
      course: "Lái xe B2",
    },
    {
      name: "Trần Văn Đức",
      content:
        "Cơ sở vật chất hiện đại, xe tập lái mới. Rất hài lòng với chất lượng dịch vụ.",
      rating: 5,
      course: "Lái xe C",
    },
    {
      name: "Lê Thị Mai",
      content:
        "Học phí hợp lý, lịch học linh hoạt. Thầy cô dạy rất dễ hiểu và kiên trì.",
      rating: 5,
      course: "Lái xe B1",
    },
  ];

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
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.9)), url('https://img.lsvn.vn/resize/th/upload/2025/03/07/chuong-trinh-dao-tao-lai-xe-00081239.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaCar className="text-4xl text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Về Chúng Tôi
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Trung Tâm Lái Xe Dịch Vụ Cổ Phần Thương Mại Trung Lương
              </p>
              <p className="text-lg opacity-80 max-w-3xl mx-auto">
                Với hơn 25 năm kinh nghiệm trong lĩnh vực đào tạo lái xe, chúng
                tôi tự hào là một trong những trung tâm uy tín hàng đầu tại Việt
                Nam, cam kết mang đến cho học viên những trải nghiệm học tập tốt
                nhất.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 -mt-10 relative">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
                  >
                    <stat.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants}>
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    Câu Chuyện Của Chúng Tôi
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Được thành lập vào năm 1999, Trung Tâm Lái Xe Dịch Vụ Cổ
                    Phần Thương Mại Trung Lương bắt đầu với sứ mệnh đơn giản
                    nhưng quan trọng: đào tạo những tài xế an toàn và có trách
                    nhiệm cho xã hội.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Qua hơn hai thập kỷ phát triển, chúng tôi đã không ngừng cải
                    tiến và nâng cao chất lượng dịch vụ, đầu tư vào cơ sở vật
                    chất hiện đại và đội ngũ giảng viên chuyên nghiệp.
                  </p>
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-semibold">
                      Chứng nhận ISO 9001:2015
                    </span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop"
                    alt="Trung tâm lái xe"
                    className="rounded-2xl shadow-lg w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Tại Sao Chọn Chúng Tôi?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất với
                  những ưu điểm vượt trội
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Đội Ngũ Chuyên Nghiệp
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Gặp gỡ những giảng viên giàu kinh nghiệm và tận tâm của chúng
                  tôi
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-2">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {member.experience}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Học Viên Nói Gì Về Chúng Tôi
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Những chia sẻ chân thật từ các học viên đã học tập tại trung
                  tâm
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 mr-1" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.course}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl font-bold text-gray-800 mb-8">
                  Liên Hệ Với Chúng Tôi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaMapMarkerAlt className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Địa chỉ
                    </h3>
                    <p className="text-gray-600">
                      123 Đường Trung Lương, Quận 1<br />
                      TP. Hồ Chí Minh
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPhone className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Điện thoại
                    </h3>
                    <p className="text-gray-600">
                      Hotline: 1900-1234
                      <br />
                      Mobile: 0901-234-567
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaEnvelope className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      info@trunglaixe.vn
                      <br />
                      support@trunglaixe.vn
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <FaHandshake className="inline mr-2" />
                    Đăng Ký Tư Vấn Miễn Phí
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};
export default About;
