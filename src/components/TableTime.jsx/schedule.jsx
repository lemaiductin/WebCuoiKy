import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaCar,
  FaUserTie,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import Header from "../Header";

const SchedulePage = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Sample schedule data
  const theorySchedule = [
    {
      id: 1,
      date: "15/06/2023",
      time: "08:00 - 10:00",
      subject: "Luật giao thông đường bộ",
      instructor: "Nguyễn Văn A",
      classroom: "P.201",
      availableSlots: 5,
    },
    {
      id: 2,
      date: "16/06/2023",
      time: "13:30 - 15:30",
      subject: "Kỹ thuật lái xe cơ bản",
      instructor: "Trần Thị B",
      classroom: "P.202",
      availableSlots: 10,
    },
    {
      id: 3,
      date: "17/06/2023",
      time: "18:00 - 20:00",
      subject: "Xử lý tình huống nguy hiểm",
      instructor: "Lê Văn C",
      classroom: "P.203",
      availableSlots: 3,
    },
  ];

  const practiceSchedule = [
    {
      id: 1,
      date: "18/06/2023",
      time: "07:00 - 09:00",
      vehicle: "Toyota Vios",
      instructor: "Nguyễn Văn D",
      location: "Sân tập Q.1",
      availableSlots: 2,
    },
    {
      id: 2,
      date: "19/06/2023",
      time: "09:30 - 11:30",
      vehicle: "Honda City",
      instructor: "Trần Thị E",
      location: "Sân tập Q.3",
      availableSlots: 4,
    },
    {
      id: 3,
      date: "20/06/2023",
      time: "14:00 - 16:00",
      vehicle: "Toyota Vios",
      instructor: "Lê Văn F",
      location: "Sân tập Q.10",
      availableSlots: 1,
    },
  ];

  const filteredTheorySchedule = theorySchedule.filter(
    (session) =>
      session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPracticeSchedule = practiceSchedule.filter(
    (session) =>
      session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {" "}
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              Lịch Học Lái Xe
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Xem và đăng ký lịch học lý thuyết, thực hành phù hợp với thời gian
              của bạn
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex items-center py-4 px-6 font-medium text-lg ${
                activeTab === "theory"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("theory")}
            >
              <FaCalendarAlt className="mr-2" />
              Lý Thuyết
            </button>
            <button
              className={`flex items-center py-4 px-6 font-medium text-lg ${
                activeTab === "practice"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab("practice")}
            >
              <FaCar className="mr-2" />
              Thực Hành
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tìm kiếm lịch học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <FaFilter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="morning">Buổi sáng</option>
                <option value="afternoon">Buổi chiều</option>
                <option value="evening">Buổi tối</option>
              </select>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    {activeTab === "theory" ? (
                      <>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Giờ
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Môn học
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Giáo viên
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Phòng
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Chỗ trống
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Ngày
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Giờ
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Xe tập
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Giáo viên
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Địa điểm
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Chỗ trống
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Thao tác
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeTab === "theory"
                    ? filteredTheorySchedule.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {session.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {session.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <FaUserTie className="mr-2 text-blue-500" />
                              {session.instructor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.classroom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                session.availableSlots > 3
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {session.availableSlots} chỗ
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              Đăng ký
                            </button>
                          </td>
                        </tr>
                      ))
                    : filteredPracticeSchedule.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {session.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <FaCar className="mr-2 text-blue-500" />
                              {session.vehicle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <FaUserTie className="mr-2 text-blue-500" />
                              {session.instructor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {session.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                session.availableSlots > 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {session.availableSlots} chỗ
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">
                              Đăng ký
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Lịch Thi Sắp Tới
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Thi Lý Thuyết</h3>
                  </div>
                  <p className="text-gray-600 mb-2">Ngày: 25/06/2023</p>
                  <p className="text-gray-600 mb-2">Địa điểm: Trung tâm Q.1</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Xem chi tiết →
                  </button>
                </div>

                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaCar className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Thi Sa Hình</h3>
                  </div>
                  <p className="text-gray-600 mb-2">Ngày: 02/07/2023</p>
                  <p className="text-gray-600 mb-2">Địa điểm: Sân thi Q.3</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Xem chi tiết →
                  </button>
                </div>

                <div className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FaCar className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg">Thi Đường Trường</h3>
                  </div>
                  <p className="text-gray-600 mb-2">Ngày: 09/07/2023</p>
                  <p className="text-gray-600 mb-2">Địa điểm: Sân thi Q.10</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Xem chi tiết →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
