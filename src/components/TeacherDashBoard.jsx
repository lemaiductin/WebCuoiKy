import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  Search,
  Filter,
  Award,
  BarChart3,
  Trash2,
} from "lucide-react";
import Header from "./Header";

const TeacherDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  const getUserNameById = (userId) => {
    const user = users.find((u) => u.id === parseInt(userId));
    return user ? user.username : `ID: ${userId}`;
  };

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/courses?populate=*"
      );

      console.log("Current user ID:", currentUser.id);

      if (isTeacher || isAdmin) {
        setRegistrations(response.data.data);
      } else if (isUser) {
        const acceptedCourses = response.data.data.filter((course) => {
          console.log(
            `Checking course ${course?.NameCourse || course.NameCourse}`
          );

          const regStatus =
            course?.registrationStatus ||
            course.data?.registrationStatus ||
            course.registrationStatus;

          console.log("Registration status:", regStatus);

          return (
            regStatus &&
            (regStatus[currentUser.documentId] === "accepted" ||
              regStatus[String(currentUser.documentId)] === "accepted")
          );
        });

        console.log("Filtered courses:", acceptedCourses.length);
        setRegistrations(acceptedCourses);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRegistrations();
  }, []);

  const handleApprove = async (courseId, userId) => {
    try {
      console.log(`Approving courseId: ${courseId}, userId: ${userId}`);

      const course = registrations.find(
        (c) => c.id === courseId || c.documentId === courseId
      );

      if (!course) {
        console.error(`Course with ID ${courseId} not found`);
        return;
      }

      console.log("Found course for approval:", course);

      const existingStatus =
        course.registrationStatus || course?.registrationStatus || {};

      const newStatus = { ...existingStatus };

      newStatus[userId] = "accepted";
      newStatus[String(userId)] = "accepted";

      console.log("User ID đang phê duyệt:", userId);
      console.log("Trạng thái mới:", newStatus);

      const actualCourseId = course.id;
      console.log("ID khóa học thực tế sẽ gửi lên API:", actualCourseId);

      const courseDocumentId = course.documentId;
      console.log("DocumentID sẽ gửi lên API:", courseDocumentId);

      const response = await axios.put(
        `http://localhost:1337/api/courses/${courseDocumentId}`,
        {
          data: { registrationStatus: newStatus },
        }
      );

      console.log("Response sau khi duyệt:", response.data);
      alert("Yêu cầu đã được chấp thuận!");
      fetchRegistrations();
    } catch (error) {
      console.error("Lỗi khi chấp thuận yêu cầu:", error);
    }
  };

  const handleReject = async (courseId, userId) => {
    try {
      console.log(`Rejecting courseId: ${courseId}, userId: ${userId}`);

      const course = registrations.find(
        (c) => c.id === courseId || c.documentId === courseId
      );

      if (!course) {
        console.error(`Course with ID ${courseId} not found`);
        return;
      }

      console.log("Found course for rejection:", course);

      const existingStatus =
        course.registrationStatus || course?.registrationStatus || {};

      const newStatus = { ...existingStatus };

      newStatus[userId] = "rejected";
      newStatus[String(userId)] = "rejected";

      console.log("User ID đang từ chối:", userId);
      console.log("Trạng thái mới:", newStatus);

      const actualCourseId = course.id;
      console.log("ID khóa học thực tế sẽ gửi lên API:", actualCourseId);

      const courseDocumentId = course.documentId;
      console.log("DocumentID sẽ gửi lên API:", courseDocumentId);

      await axios.put(`http://localhost:1337/api/courses/${courseDocumentId}`, {
        data: { registrationStatus: newStatus },
      });

      alert("Yêu cầu đã bị từ chối!");
      fetchRegistrations();
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
    }
  };

  const handleDelete = async (courseId, userId) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa trạng thái đăng ký này không?")
    ) {
      try {
        console.log(
          `Deleting registration for courseId: ${courseId}, userId: ${userId}`
        );

        const course = registrations.find(
          (c) => c.id === courseId || c.documentId === courseId
        );

        if (!course) {
          console.error(`Course with ID ${courseId} not found`);
          return;
        }

        console.log("Found course for deletion:", course);

        const existingStatus =
          course.registrationStatus || course?.registrationStatus || {};

        const newStatus = { ...existingStatus };

        // Remove the user's registration status completely
        delete newStatus[userId];
        delete newStatus[String(userId)];

        console.log("User ID đang xóa:", userId);
        console.log("Trạng thái mới sau khi xóa:", newStatus);

        const courseDocumentId = course.documentId;
        console.log("DocumentID sẽ gửi lên API:", courseDocumentId);

        await axios.put(
          `http://localhost:1337/api/courses/${courseDocumentId}`,
          {
            data: { registrationStatus: newStatus },
          }
        );

        alert("Đã xóa trạng thái đăng ký thành công!");
        fetchRegistrations();
      } catch (error) {
        console.error("Lỗi khi xóa trạng thái đăng ký:", error);
        alert("Không thể xóa trạng thái đăng ký. Vui lòng thử lại!");
      }
    }
  };

  // Get pending registrations for stats
  const getPendingRegistrations = () => {
    let pendingCount = 0;
    registrations.forEach((course) => {
      const registrationStatus =
        course.registrationStatus || course?.registrationStatus;
      if (registrationStatus) {
        Object.values(registrationStatus).forEach((status) => {
          if (status === "pending") pendingCount++;
        });
      }
    });
    return pendingCount;
  };

  // Get total courses
  const getTotalCourses = () => registrations.length;

  // Get filtered registrations
  const getFilteredRegistrations = () => {
    let filteredData = [];

    registrations.forEach((course) => {
      const registrationStatus =
        course.registrationStatus || course?.registrationStatus;

      if (!registrationStatus) return;

      const courseId = course.id || course.documentId;
      const courseName = course.NameCourse;

      Object.entries(registrationStatus).forEach(([userId, status]) => {
        if (filterStatus === "all" || status === filterStatus) {
          const userName = getUserNameById(userId);
          if (
            searchTerm === "" ||
            courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            userName.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            filteredData.push({
              courseId,
              courseName,
              userId,
              userName,
              status,
              course,
            });
          }
        }
      });
    });

    return filteredData;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải danh sách yêu cầu...</p>
        </div>
      </div>
    );
  }

  const filteredRegistrations = getFilteredRegistrations();
  const pendingCount = getPendingRegistrations();
  const totalCourses = getTotalCourses();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    📋 Bảng điều khiển giảng viên
                  </h1>
                  <p className="text-gray-600">
                    Quản lý yêu cầu đăng ký khóa học của học viên
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">
                    {pendingCount}
                  </div>
                  <div className="text-sm text-gray-500">Yêu cầu chờ duyệt</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tổng khóa học</p>
                  <p className="text-2xl font-bold">{totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Chờ duyệt</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Đã duyệt</p>
                  <p className="text-2xl font-bold">
                    {
                      filteredRegistrations.filter(
                        (r) => r.status === "accepted"
                      ).length
                    }
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Đã từ chối</p>
                  <p className="text-2xl font-bold">
                    {
                      filteredRegistrations.filter(
                        (r) => r.status === "rejected"
                      ).length
                    }
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-200" />
              </div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên khóa học hoặc học viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="accepted">Đã duyệt</option>
                  <option value="rejected">Đã từ chối</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Registrations List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredRegistrations.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  Không có yêu cầu nào
                </h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== "all"
                    ? "Không tìm thấy yêu cầu phù hợp với bộ lọc"
                    : "Hiện tại chưa có yêu cầu đăng ký nào"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredRegistrations.map((registration, index) => (
                    <motion.div
                      key={`${registration.courseId}-${registration.userId}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                  {registration.courseName}
                                </h3>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <User className="w-4 h-4" />
                                  <span>Học viên: {registration.userName}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  registration.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : registration.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {registration.status === "pending" && (
                                  <Clock className="w-4 h-4 mr-1" />
                                )}
                                {registration.status === "accepted" && (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                )}
                                {registration.status === "rejected" && (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                {registration.status === "pending" &&
                                  "Chờ duyệt"}
                                {registration.status === "accepted" &&
                                  "Đã duyệt"}
                                {registration.status === "rejected" &&
                                  "Đã từ chối"}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Ngày đăng ký:{" "}
                                {new Date().toLocaleDateString("vi-VN")}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3 ml-6">
                            {registration.status === "pending" && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleApprove(
                                      registration.courseId,
                                      registration.userId
                                    )
                                  }
                                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Chấp thuận</span>
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleReject(
                                      registration.courseId,
                                      registration.userId
                                    )
                                  }
                                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span>Từ chối</span>
                                </motion.button>
                              </>
                            )}

                            {/* Nút xóa hiển thị cho tất cả trạng thái */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                handleDelete(
                                  registration.courseId,
                                  registration.userId
                                )
                              }
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md"
                              title="Xóa trạng thái đăng ký"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Xóa</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
