import React, { useEffect, useState } from "react";
import { FiTrash2, FiUser, FiMail, FiSearch, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const { documentId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Lấy thông tin user hiện tại và kiểm tra quyền
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin khóa học cụ thể theo documentId
        const res = await axios.get(
          `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
        );

        // Kiểm tra xem có dữ liệu trả về không
        if (!res.data.data || res.data.data.length === 0) {
          console.error("Không tìm thấy khóa học với ID:", documentId);
          return;
        }

        const course = res.data.data[0];
        console.log("Thông tin khóa học:", course);

        // Lấy registrationStatus từ khóa học
        const status = course?.registrationStatus || {};
        console.log("Trạng thái đăng ký:", status);

        // Lấy danh sách tất cả users
        const userRes = await axios.get("http://localhost:1337/api/users");
        const allUsers = userRes.data;
        console.log("Tất cả users:", allUsers);

        // Lọc users đã được duyệt (cần xử lý cả dạng string và number ID)
        const acceptedUserIds = Object.entries(status)
          .filter(([_, value]) => value === "accepted")
          .map(([id]) => id);

        console.log("ID người dùng đã được duyệt:", acceptedUserIds);

        // Lọc users phù hợp - kiểm tra cả string và number ID
        const filteredUsers = allUsers.filter(
          (user) =>
            acceptedUserIds.includes(String(user.id)) ||
            acceptedUserIds.includes(user.id)
        );

        console.log("Người dùng được lọc:", filteredUsers);
        setUsers(allUsers);
        setMembers(filteredUsers);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [documentId]);

  // Filter members based on search term
  const filteredMembers = members.filter(
    (member) =>
      member.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId) => {
    try {
      // Lấy khóa học theo documentId
      const courseRes = await axios.get(
        `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
      );
      const course = courseRes.data.data[0];

      // Xóa user khỏi registrationStatus
      const updatedStatus = { ...course.registrationStatus };
      delete updatedStatus[userId];

      // Gọi API cập nhật khóa học
      await axios.put(`http://localhost:1337/api/courses/${documentId}`, {
        data: {
          registrationStatus: updatedStatus,
        },
      });

      // Cập nhật UI
      setMembers(members.filter((member) => member.id !== userId));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Lỗi khi xóa học viên:", error);
      alert("Xóa học viên thất bại!");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không có thông tin";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Danh sách học viên
          </h1>
          <p className="text-gray-600">{members.length} học viên</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        user.avatar
                          ? user.avatar
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.username || "User"
                            )}&background=random`
                      }
                      alt={user.username || "Avatar"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://ui-avatars.com/api/?name=Unknown&background=random";
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.username || "Người dùng"}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <FiMail className="mr-2" />
                      <span>{user.email || "Không có email"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    <span>
                      Tham gia: {formatDate(user.joinDate || user.createdAt)}
                    </span>
                  </div>
                </div>

                {(isTeacher || isAdmin) && (
                  <div className="mt-6 flex justify-end">
                    {showDeleteConfirm === user.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Xác nhận xóa
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition"
                        title="Xóa học viên"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <FiSearch className="mx-auto text-4xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">
              Không tìm thấy học viên
            </h3>
            <p className="text-gray-500 mt-1">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        )}
      </div>

      {/* Empty state (when no members at all) */}
      {members.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FiUser className="w-full h-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-600">
            Chưa có học viên nào
          </h3>
        </div>
      )}
    </div>
  );
};

export default MemberList;
