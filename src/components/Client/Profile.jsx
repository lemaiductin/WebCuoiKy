import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetail, updateUser } from "../../api/auth.api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaMapMarkerAlt,
  FaUserShield,
  FaUserTie,
  FaCar,
  FaEdit,
  FaSave,
  FaTimes,
  FaIdCard,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";
import Header from "../Header";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    roleUser: "",
  });

  useEffect(() => {
    getUserDetail(id)
      .then((res) => {
        setUser(res.data);
        setForm({
          username: res.data.username || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          dob: res.data.dob || "",
          gender: res.data.gender || "",
          address: res.data.address || "",
          roleUser: res.data.roleUser || "USER",
        });
      })
      .catch((err) => console.error("Lỗi khi lấy thông tin user:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(id, form)
      .then(() => {
        alert("Cập nhật thông tin thành công!");
        setIsEditing(false);
        setUser({ ...user, ...form });
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật thông tin:", err);
        alert("Cập nhật thông tin thất bại!");
      });
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.roleUser === "ADMIN";

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Đang tải thông tin hồ sơ...</p>
          </div>
        </div>
      </>
    );
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <FaUserShield className="text-red-500" />;
      case "TEACHER":
        return <FaUserTie className="text-blue-500" />;
      case "USER":
        return <FaUserGraduate className="text-green-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "ADMIN":
        return "Quản trị viên";
      case "TEACHER":
        return "Giảng viên";
      case "USER":
        return "Học viên";
      default:
        return "Người dùng";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "from-red-500 to-red-600";
      case "TEACHER":
        return "from-blue-500 to-blue-600";
      case "USER":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section
          className={`bg-gradient-to-r ${getRoleColor(
            user.roleUser
          )} text-white py-20`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  {getRoleIcon(user.roleUser)}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {user.username}
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-semibold">
                    {getRoleLabel(user.roleUser)}
                  </span>
                </div>
                {/* <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="font-semibold">ID: {id}</span>
                </div> */}
              </div>
              <p className="text-xl opacity-90">
                Trung Tâm lái xe dịch vụ cổ phần thương mại trung lương
              </p>
            </motion.div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto"
            >
              {/* Profile Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Personal Information Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <h2 className="text-2xl font-bold flex items-center">
                      <FaUser className="mr-3" />
                      Thông tin cá nhân
                    </h2>
                    <p className="opacity-90 mt-1">
                      Thông tin căn cước và liên hệ
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Username Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaIdCard className="mr-2 text-blue-500" />
                        Họ và tên
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                          placeholder="Nhập họ và tên"
                        />
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.username}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaEnvelope className="mr-2 text-blue-500" />
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                          placeholder="Nhập email"
                        />
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.email}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaPhone className="mr-2 text-blue-500" />
                        Số điện thoại
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                          placeholder="Nhập số điện thoại"
                        />
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.phone || (
                              <span className="text-gray-400 italic">
                                Chưa cập nhật
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Training Information Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div
                    className={`bg-gradient-to-r ${getRoleColor(
                      user.roleUser
                    )} text-white p-6`}
                  >
                    <h2 className="text-2xl font-bold flex items-center">
                      <FaCar className="mr-3" />
                      Thông tin đào tạo
                    </h2>
                    <p className="opacity-90 mt-1">
                      Chi tiết học tập và vai trò
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Date of Birth Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaBirthdayCake className="mr-2 text-pink-500" />
                        Ngày sinh
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dob"
                          value={form.dob}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                        />
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.dob ? (
                              new Date(user.dob).toLocaleDateString("vi-VN")
                            ) : (
                              <span className="text-gray-400 italic">
                                Chưa cập nhật
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Gender Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaVenusMars className="mr-2 text-purple-500" />
                        Giới tính
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={form.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                        >
                          <option value="">Chọn giới tính</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="Khác">Khác</option>
                        </select>
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.gender || (
                              <span className="text-gray-400 italic">
                                Chưa chọn
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Address Field */}
                    <div className="group">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        Địa chỉ
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                          placeholder="Nhập địa chỉ"
                        />
                      ) : (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                          <span className="text-gray-800 font-medium">
                            {user.address || (
                              <span className="text-gray-400 italic">
                                Chưa cập nhật
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Role Information Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8"
              ></motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-md"
                      >
                        <FaTimes />
                        <span>Hủy bỏ</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                      >
                        <FaSave />
                        <span>Lưu thay đổi</span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="not-editing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r ${getRoleColor(
                        user.roleUser
                      )} text-white rounded-xl hover:shadow-lg transition-all duration-300 shadow-md`}
                    >
                      <FaEdit />
                      <span>Chỉnh sửa hồ sơ</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
