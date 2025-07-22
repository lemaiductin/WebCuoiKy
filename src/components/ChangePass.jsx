import React, { useState } from "react";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineKey,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import {
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../api/auth.api";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const userData = {
    currentPassword,
    password: newPassword,
    passwordConfirmation: confirmPassword,
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Mật khẩu hiện tại không được để trống";
    }

    if (!newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (currentPassword === newPassword && currentPassword !== "") {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const changePass = await changePassword(userData);
      console.log("Change:", changePass);
      setMessage("Đổi mật khẩu thành công!");
      setMessageType("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error) {
      console.error("Đổi mật khẩu lỗi:", error);
      setMessage("Mật khẩu hiện tại không đúng hoặc lỗi hệ thống.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors mb-6"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chủ</span>
        </button>
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 flex justify-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <FaShieldAlt className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Đổi mật khẩu
            </h2>
            <p className="text-gray-500">
              Cập nhật mật khẩu để bảo vệ tài khoản của bạn
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Security Tips */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <HiOutlineShieldCheck className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">
                    Mẹo bảo mật
                  </h3>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Sử dụng ít nhất 6 ký tự</li>
                    <li>• Không sử dụng thông tin cá nhân</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl border-2 ${
                  messageType === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {messageType === "success" ? (
                    <FaCheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-lg">⚠️</span>
                  )}
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleChangePassword} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Mật khẩu hiện tại
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineKey className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu hiện tại"
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      clearError("currentPassword");
                      setMessage("");
                    }}
                    className={`pl-10 pr-10 w-full px-4 py-3 border-2 ${
                      errors.currentPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrentPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <span className="mr-1">⚠️</span>
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      clearError("newPassword");
                      setMessage("");
                    }}
                    className={`pl-10 pr-10 w-full px-4 py-3 border-2 ${
                      errors.newPassword ? "border-red-500" : "border-gray-200"
                    } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <span className="mr-1">⚠️</span>
                    {errors.newPassword}
                  </p>
                )}
                {/* Password Strength Indicator */}
                {newPassword.length > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Độ mạnh mật khẩu</span>
                      <span
                        className={`font-medium ${
                          newPassword.length >= 6
                            ? "text-green-500"
                            : newPassword.length >= 4
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {newPassword.length >= 6
                          ? "Mạnh"
                          : newPassword.length >= 4
                          ? "Trung bình"
                          : "Yếu"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          newPassword.length >= 6
                            ? "bg-green-500"
                            : newPassword.length >= 4
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (newPassword.length / 6) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockPasswordLine className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError("confirmPassword");
                      setMessage("");
                    }}
                    className={`pl-10 pr-10 w-full px-4 py-3 border-2 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <span className="mr-1">⚠️</span>
                    {errors.confirmPassword}
                  </p>
                )}
                {/* Password Match Indicator */}
                {confirmPassword.length > 0 && (
                  <div className="mt-1">
                    <div className="flex items-center text-xs">
                      {newPassword === confirmPassword ? (
                        <>
                          <span className="text-green-500 mr-1">✓</span>
                          <span className="text-green-500 font-medium">
                            Mật khẩu khớp
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-red-500 mr-1">✗</span>
                          <span className="text-red-500 font-medium">
                            Mật khẩu không khớp
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <FaLock className="mr-2 h-4 w-4" />
                      Xác nhận đổi mật khẩu
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Đảm bảo mật khẩu của bạn an toàn và không chia sẻ với người khác
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
