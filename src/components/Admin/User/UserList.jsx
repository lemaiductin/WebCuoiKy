import { useEffect, useState } from "react";
import { getUserList, deleteUser } from "../../../api/auth.api";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 3;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = () => {
    getUserList()
      .then((res) => {
        // Nếu trả về mảng
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setAllUsers(data);
        setTotalPages(Math.ceil(data.length / PAGE_SIZE));
        setUsers(
          data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsers(
      allUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    );
  }, [currentPage, allUsers]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      deleteUser(id)
        .then(() => fetchUsers(currentPage))
        .catch(() => alert("Xóa thất bại!"));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">
        📋 Danh sách người dùng đã đăng ký
      </h2>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded mr-2 transition"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  Không có người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            } font-semibold transition`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
};

export default UserList;
