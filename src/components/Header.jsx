import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { BiKey, BiLogOut, BiUserCircle } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { LuLayoutDashboard, LuLibrary, LuUserCog } from "react-icons/lu";
import { FaUserCog, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.roleUser === "ADMIN";
  const isTeacher = user?.roleUser === "TEACHER";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // exit
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-red-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 13V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Trung Lương
              </span>
              <div className="text-xs text-gray-500 font-medium">
                Học lái xe uy tín
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-red-600 bg-red-50 shadow-md"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-red-600 bg-red-50 shadow-md"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`
              }
            >
              Khóa học
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-red-600 bg-red-50 shadow-md"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`
              }
            >
              Giới Thiệu
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "text-red-600 bg-red-50 shadow-md"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`
              }
            >
              Liên hệ
            </NavLink>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:block px-6 py-2 text-red-600 border-2 border-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-red-50 hover:to-pink-50 transition-all duration-300 border border-gray-200 hover:border-red-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BiUserCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.roleUser?.toLowerCase()}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Menu.Button>

                <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden border border-gray-100">
                  <div className="py-2">
                    <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.email}
                      </p>
                      <p className="text-xs text-red-600 capitalize font-medium">
                        {user.roleUser?.toLowerCase()}
                      </p>
                    </div>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/profile/${user.id}`)}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-gray-700"
                          } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                        >
                          <BiUserCircle className="w-5 h-5 mr-3" />
                          Hồ sơ cá nhân
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate(`/courseList`)}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-gray-700"
                          } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                        >
                          <LuLibrary className="w-5 h-5 mr-3" />
                          Khóa học của tôi
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate("/settings")}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-gray-700"
                          } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                        >
                          <CiSettings className="w-5 h-5 mr-3" />
                          Cài đặt
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate("/change-password")}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-gray-700"
                          } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                        >
                          <BiKey className="w-5 h-5 mr-3" />
                          Đổi mật khẩu
                        </button>
                      )}
                    </Menu.Item>

                    {isAdmin && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate(`/admin/users`)}
                            className={`${
                              active
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700"
                            } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                          >
                            <FaUserCog className="w-5 h-5 mr-3" />
                            Quản trị hệ thống
                          </button>
                        )}
                      </Menu.Item>
                    )}

                    {isTeacher && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate(`/approve`)}
                            className={`${
                              active
                                ? "bg-green-50 text-green-600"
                                : "text-gray-700"
                            } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                          >
                            <FaUserCog className="w-5 h-5 mr-3" />
                            Duyệt khóa học
                          </button>
                        )}
                      </Menu.Item>
                    )}

                    <div className="border-t border-gray-100 my-2"></div>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-red-50 text-red-600" : "text-red-600"
                          } flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200`}
                        >
                          <BiLogOut className="w-5 h-5 mr-3" />
                          Đăng xuất
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Khóa học
              </NavLink>
              <NavLink
                to="/teachers"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Giảng viên
              </NavLink>
              <NavLink
                to="/schedule"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Lịch học
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-red-600 bg-red-50"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                  }`
                }
              >
                Liên hệ
              </NavLink>

              {!token && (
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-red-600 border-2 border-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
