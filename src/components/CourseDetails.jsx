import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const mockCourseData = {
  id: 1,
  attributes: {
    NameCourse: "Khóa học Lái Xe B2 Cơ Bản",
    schedule: "Thứ 2 - Thứ 6, 8:00 - 10:00",
    license_type: "B2",
    Tuition: 7500000,
    description:
      "Đây là mô tả của khóa học lái xe B2. Bạn sẽ học lý thuyết và thực hành.",
    content:
      "1. Lý thuyết giao thông\n2. Thực hành lái xe trong sa hình\n3. Thi thử",
    preferential: "Giảm 10% cho học viên đăng ký nhóm 3 người.",
    instructor: {
      name: "Nguyễn Văn A",
      qualification: "Thạc sĩ Giao Thông Vận Tải",
      bio: "10 năm kinh nghiệm giảng dạy và đào tạo lái xe",
      photo: "/uploads/instructor_sample.jpg",
    },
    img: {
      data: [
        {
          url: "/uploads/course_sample.jpg",
          name: "course_sample.jpg",
        },
      ],
    },
  },
};

const CourseDetails = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  // const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [course, setCourse] = useState(mockCourseData); // Sử dụng mock data
  // useEffect(() => {
  //   const fetchCourseDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:1337/api/courses?filters[documentId][$eq]=${documentId}&populate=*`
  //       );
  //       const courseData = response.data.data[0];
  //       if (courseData) {
  //         setCourse(courseData);
  //       } else {
  //         console.warn("Không tìm thấy dữ liệu từ API, sử dụng mock data.");
  //         setCourse(mockCourseData);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi lấy thông tin khóa học từ API:", error);
  //       console.warn("Sử dụng mock data thay thế.");
  //       setCourse(mockCourseData);
  //     }
  //   };

  //   fetchCourseDetails();
  // }, [documentId]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleViewMaterials = () => {
    navigate(`/courses/${documentId}/materials`);
  };

  const handleViewAssignments = () => {
    navigate(`/courses/${documentId}/assignments`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {course?.attributes?.img?.data && (
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`http://localhost:1337${course.attributes.img.data[0].url}`}
              alt={course.attributes.img.data[0].name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {course.attributes.NameCourse}
          </h2>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Lịch trình:</span>{" "}
            {course.attributes.schedule}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Loại bằng:</span>{" "}
            {course.attributes.license_type}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Học phí:</span>{" "}
            {new Intl.NumberFormat("vi-VN").format(course.attributes.Tuition)} đ
          </p>

          <div className="flex flex-wrap gap-4 mt-6"></div>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Thông tin giảng viên
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
            {course.attributes.instructor?.photo && (
              <img
                src={`http://localhost:1337${course.attributes.instructor.photo}`}
                alt="Instructor"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">
              {course.attributes.instructor?.name || "Đang cập nhật"}
            </h4>
            <p className="text-gray-600 text-sm">
              {course.attributes.instructor?.qualification || "Giảng viên"}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {course.attributes.instructor?.bio ||
                "Không có thông tin chi tiết"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {["description", "document", "exam"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab === "description" && "Mô tả khóa học"}
              {tab === "document" && "Bài giảng"}
              {tab === "exam" && "Bài tập"}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === "description" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Giới thiệu khóa học
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {course.attributes.description || "Không có mô tả chi tiết"}
            </p>
          </div>
        )}
        {activeTab === "document" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Danh sách tài liệu
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {course.attributes.content || "Đang cập nhật nội dung chi tiết"}
            </p>
          </div>
        )}
        {activeTab === "exam" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Danh sách bài tập
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {course.attributes.preferential || "Không có ưu đãi đặc biệt"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
