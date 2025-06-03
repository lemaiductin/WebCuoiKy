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

import { toast } from "react-toastify";
import Header from "../Header";
import { getCoursesDetail, getUserDetail } from "../../api/auth.api";
import moment from "moment";
import {
  approveRequestStudentRegisterCourse,
  getAllRequestStudentRegisterCourse,
} from "../../api/course.api";

const MyRequest = () => {
  const [registrations, setRegistrations] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
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
    fetchAllRequestStudentRegisterCourse();
  }, []);

  const fetchStudentById = async (student_id) => {
    try {
      const res = await getUserDetail(student_id);
      console.log("fetchStudentByID", res);
      return res.data; // hoặc res.data.data nếu API của bạn như vậy
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sinh viên:", error);
      return null; // fallback an toàn
    }
  };
  const fetchCourseDetailById = async (course_documentId) => {
    console.log("Course ID to fetch:", course_documentId);
    try {
      const res = await getCoursesDetail(course_documentId);
      console.log("getCoursesDetail", res);
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khóa học:", error);
      return null; // fallback an toàn
    }
  };

  const fetchAllRequestStudentRegisterCourse = async () => {
    try {
      const res = await getAllRequestStudentRegisterCourse();

      const allRequestOfCourse = res.data.data.filter(
        (item) => item.student_id === currentUser.id
      );

      const combinedData = await Promise.all(
        allRequestOfCourse.map(async (request) => {
          const student = await fetchStudentById(request.student_id);
          const course = await fetchCourseDetailById(request.course_id);
          return {
            request,
            student,
            course,
          };
        })
      );
      setAllRequest(combinedData);
      console.log("Kết quả gộp:", combinedData);
      // setState(combinedData); nếu bạn đang dùng React
      return combinedData;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      return [];
    }
  };

  const handleCancel = async (request_id) => {
    const payload = { status_id: 4 };
    const res = await approveRequestStudentRegisterCourse(request_id, payload);
    if (res) {
      toast.success("Đã hủy!");
      fetchAllRequestStudentRegisterCourse();
    }
  };
  // Đếm số lượng request theo trạng thái
  const getRequestCountByStatus = (status_id) => {
    return allRequest.filter((r) => r.request.status_id === status_id).length;
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
  const getTotalCourses = () => allRequest.length;

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
                    {getRequestCountByStatus(1)}
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
                  <p className="text-2xl font-bold">{allRequest.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Chờ duyệt</p>
                  <p className="text-2xl font-bold">
                    {getRequestCountByStatus(1)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Đã duyệt</p>
                  <p className="text-2xl font-bold">
                    {getRequestCountByStatus(2)}
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
                    {getRequestCountByStatus(3)}
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
                  <option value="1">Chờ duyệt</option>
                  <option value="2">Đã duyệt</option>
                  <option value="3">Đã từ chối</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Registrations List phan chinh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {allRequest.length === 0 ? (
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
                  {allRequest.map((request, index) => (
                    <motion.div
                      key={`${request.request.documentId}`}
                      //  request.course?.id
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
                                  {request.course?.NameCourse}
                                </h3>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <User className="w-4 h-4" />
                                  <span>
                                    Học viên:{" "}
                                    {request.student?.fullname ||
                                      request.student?.username}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  request.request.status_id === 1
                                    ? "bg-yellow-100 text-yellow-800" // Chờ xác nhận
                                    : request.request.status_id === 2
                                    ? "bg-green-100 text-green-800" // Đã xác nhận
                                    : request.request.status_id === 3
                                    ? "bg-red-100 text-red-800" // Từ chối
                                    : request.request.status_id === 4
                                    ? "bg-gray-100 text-gray-800" // Đã hủy
                                    : "bg-neutral-100 text-neutral-800" // Fallback (không xác định)
                                }`}
                              >
                                {request.request.status_id === 1
                                  ? "Chờ xác nhận"
                                  : request.request.status_id === 2
                                  ? "Đã xác nhận"
                                  : request.request.status_id === 3
                                  ? "Từ chối"
                                  : request.request.status_id === 4
                                  ? "Đã hủy"
                                  : "Không xác định"}
                              </div>

                              <div className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Ngày đăng ký:{" "}
                                {moment(request.request.createdAt).format(
                                  "HH:mm:ss, DD/MM/YYYY"
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-3 ml-6">
                            {request.request.status_id === 1 && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleCancel(request.request.documentId)
                                  }
                                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Hủy bỏ</span>
                                </motion.button>
                              </>
                            )}

                            {/* Nút xóa hiển thị cho tất cả trạng thái */}
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

export default MyRequest;
