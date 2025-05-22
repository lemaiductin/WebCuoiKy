import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetail, updateUser } from "../../api/auth.api";

const Profile = () => {
  const { id } = useParams(); // Lấy id từ URL
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
    // Gọi API để lấy thông tin chi tiết user
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
    console.log("Dữ liệu gửi lên:", form);
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
  const currentUser = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user hiện tại
  const isAdmin = currentUser?.roleUser === "ADMIN"; // Kiểm tra nếu user là Admin

  if (!user) {
    return <div>Đang tải thông tin...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Thông tin cá nhân
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-2">Họ và tên</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="border rounded px-3 py-2">{user.username}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="border rounded px-3 py-2">{user.email}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Số điện thoại</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="border rounded px-3 py-2">
              {user.phone || "Chưa cập nhật"}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Ngày sinh</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="border rounded px-3 py-2">
              {user.dob || "Chưa cập nhật"}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Giới tính</label>
          {isEditing ? (
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          ) : (
            <p className="border rounded px-3 py-2">
              {user.gender || "Chọn giới tính"}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">Địa chỉ</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="border rounded px-3 py-2">
              {user.address || "Chưa cập nhật"}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Vai trò</label>
          {isEditing && isAdmin ? ( // Chỉ hiển thị dropdown nếu đang chỉnh sửa và là Admin
            <select
              name="roleUser"
              value={form.roleUser}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">chọn vai trò</option>
              <option value="ADMIN">ADMIN</option>
              <option value="TEACHER">TEACHER</option>
              <option value="USER">USER</option>
            </select>
          ) : (
            <p className="border rounded px-3 py-2">
              {user.roleUser || "USER"}
            </p>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Lưu
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Chỉnh sửa
        </button>
      )}
    </div>
  );
};

export default Profile;
