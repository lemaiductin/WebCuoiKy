import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { RiRoadMapLine, RiUserSearchLine } from "react-icons/ri";
import { MdOutlineDirectionsCar } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative bg-blue-600 p-6 sm:p-8 text-white">
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute transform rotate-12 -left-6 -top-6">
              <MdOutlineDirectionsCar className="w-32 h-32" />
            </div>
            <div className="absolute transform -rotate-12 -right-6 -bottom-6">
              <RiRoadMapLine className="w-32 h-32" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold">404</h1>
              <h2 className="text-xl sm:text-2xl font-semibold mt-2">
                Trang không tìm thấy
              </h2>
            </div>
            <div className="mt-6 sm:mt-0">
              <div className="relative w-36 h-36 sm:w-48 sm:h-48">
                {/* Car animation */}
                <div className="absolute inset-0 animate-pulse">
                  <MdOutlineDirectionsCar className="w-full h-full text-white" />
                </div>
                {/* User looking for direction */}
                <div className="absolute bottom-0 right-0">
                  <RiUserSearchLine className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-800">
                Có vẻ như bạn đã đi chệch đường!
              </h3>
              <p className="mt-2 text-gray-600">
                Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến
                địa chỉ khác.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0 text-blue-500">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Không sao! Bạn vẫn có thể quay lại trang chủ hoặc liên hệ
                    với chúng tôi để được hướng dẫn.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
              >
                <FaHome className="mr-2" />
                Trang chủ
              </Link>
              <Link
                to="/courses"
                className="flex-1 flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-300"
              >
                <MdOutlineDirectionsCar className="mr-2" />
                Khóa học lái xe
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Cần hỗ trợ?
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FaPhoneAlt className="mr-2 text-blue-500" />
                <span>Hotline: 0901.234.567</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FaEnvelope className="mr-2 text-blue-500" />
                <span>Email: support@laixe.vn</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Trung tâm đào tạo lái xe. Tất cả
              quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-3xl">
        <Link
          to="/about"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Về chúng tôi
        </Link>
        <Link
          to="/contact"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Liên hệ
        </Link>
        <Link
          to="/courses"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Khóa học
        </Link>
        <Link
          to="/locations"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Địa điểm đào tạo
        </Link>
        <Link
          to="/faq"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Câu hỏi thường gặp
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
