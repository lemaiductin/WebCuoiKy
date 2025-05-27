import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { User } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:1337/api/courses?populate=*"
        );
        console.log("Courses data cmmm:", response.data.data);
        setCourses(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    { id: "all", name: "Tất cả khóa học", icon: "🎯" },
    { id: "B1", name: "Bằng B1", icon: "🚗" },
    { id: "B2", name: "Bằng B2", icon: "🚙" },
    { id: "C", name: "Bằng C", icon: "🚛" },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) =>
          course.NameCourse?.toLowerCase().includes(
            selectedCategory.toLowerCase()
          )
        );

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

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải khóa học...</p>
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
        <section className="bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Khám phá
                <span className="text-yellow-300"> khóa học</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Tìm hiểu các khóa học lái xe chất lượng cao với đội ngũ giảng
                viên chuyên nghiệp
              </p>
              <div className="flex justify-center items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold">
                    {courses.length} khóa học có sẵn
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Chọn loại <span className="text-red-600">bằng lái</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div
                    key={course.documentId}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() =>
                      navigate(`/page-course/${course.documentId}`)
                    }
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={
                          course.img
                            ? `http://localhost:1337${course.img[0].url}`
                            : "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&h=300&auto=format&fit=crop"
                        }
                        alt={course.NameCourse || "Khóa học"}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Mới
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                        {course.NameCourse}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {course.description ||
                          "Khóa học chất lượng cao với đội ngũ giảng viên chuyên nghiệp, giúp bạn nắm vững kỹ năng lái xe an toàn."}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-600 font-medium">
                            Đang mở đăng ký
                          </span>

                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-sm shadow-md"
                        >
                          Xem chi tiết →
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <div className="text-gray-400 text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">
                    Không tìm thấy khóa học
                  </h3>
                  <p className="text-gray-500">
                    Hiện tại chưa có khóa học nào trong danh mục này
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Không tìm thấy khóa học phù hợp?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Liên hệ với chúng tôi để được tư vấn khóa học phù hợp nhất với
                nhu cầu của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                >
                  📞 Tư vấn miễn phí
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="px-8 py-4 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
                >
                  🏠 Về trang chủ
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
