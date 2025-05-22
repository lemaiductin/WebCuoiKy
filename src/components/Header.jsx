import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { BiKey, BiLogOut, BiUserCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { LuLayoutDashboard, LuLibrary, LuUserCog } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.roleUser === "ADMIN";
  const isTeacher = user?.roleUser === "TEACHER";
  console.log(user);

  // exit
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="w-10 h-10 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22 13V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <span className="ml-2 text-xl font-bold text-gray-800">
            DriveAcademy
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-blue-600 font-medium">
            Trang chủ
          </a>
          <a href="/courses" className="text-gray-600 hover:text-blue-600">
            Khóa học
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Giảng viên
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Lịch học
          </a>
          <a href="" className="text-gray-600 hover:text-blue-600">
            Liên hệ
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center">
                <p>{user.email}</p>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(`/profile/${user.id}`)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <BiUserCircle className="w-4 h-4 mr-2" />
                        Hồ sơ
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/settings")}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <CiSettings className="w-4 h-4 mr-2" />
                        Cài đặt
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/change-password")}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <BiKey className="w-4 h-4 mr-2" />
                        Đổi mật khẩu
                      </button>
                    )}
                  </Menu.Item>

                  {/* <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate("/admin")}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <LuLayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </button>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(`/courseList`)}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                      >
                        <LuLibrary className="w-4 h-4 mr-2" />
                        Khóa học của tôi
                      </button>
                    )}
                  </Menu.Item>
                  {isAdmin && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/admin/users`)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          <FaUserCog className="w-4 h-4 mr-2" />
                          Admin
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  {isTeacher && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/upload`)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          <FaUserCog className="w-4 h-4 mr-2" />
                          Up Materials
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                      >
                        <BiLogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          )}

          <button className="md:hidden text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
