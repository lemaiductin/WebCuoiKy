import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Hạng B1 - Xe số tự động",
      price: 12500000,
      duration: "3 tháng",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='none'%3E%3Crect width='200' height='150' fill='%23f1f5f9'/%3E%3Cpath d='M160 110H40V60C40 53.373 45.373 48 52 48H148C154.627 48 160 53.373 160 60V110Z' fill='%231d4ed8'/%3E%3Ccircle cx='60' cy='110' r='15' fill='%23333'/%3E%3Ccircle cx='60' cy='110' r='8' fill='%23999'/%3E%3Ccircle cx='140' cy='110' r='15' fill='%23333'/%3E%3Ccircle cx='140' cy='110' r='8' fill='%23999'/%3E%3Crect x='52' y='55' width='96' height='25' rx='5' fill='%23e0f2fe'/%3E%3C/svg%3E",
      description: "Khóa học dành cho người mới bắt đầu, xe số tự động",
    },
    {
      id: 2,
      title: "Hạng B2 - Xe số sàn",
      price: 14500000,
      duration: "4 tháng",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='none'%3E%3Crect width='200' height='150' fill='%23f1f5f9'/%3E%3Cpath d='M160 110H40V60C40 53.373 45.373 48 52 48H148C154.627 48 160 53.373 160 60V110Z' fill='%23dc2626'/%3E%3Ccircle cx='60' cy='110' r='15' fill='%23333'/%3E%3Ccircle cx='60' cy='110' r='8' fill='%23999'/%3E%3Ccircle cx='140' cy='110' r='15' fill='%23333'/%3E%3Ccircle cx='140' cy='110' r='8' fill='%23999'/%3E%3Crect x='52' y='55' width='96' height='25' rx='5' fill='%23e0f2fe'/%3E%3C/svg%3E",
      description: "Khóa học nâng cao, hướng dẫn lái xe số sàn chuyên nghiệp",
    },
    {
      id: 3,
      title: "Hạng C - Xe tải",
      price: 18500000,
      duration: "5 tháng",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='none'%3E%3Crect width='200' height='150' fill='%23f1f5f9'/%3E%3Cpath d='M160 95H30V60C30 53.373 35.373 48 42 48H148C154.627 48 160 53.373 160 60V95Z' fill='%235b21b6'/%3E%3Cpath d='M160 95H120V70H150C155.523 70 160 74.477 160 80V95Z' fill='%237c3aed'/%3E%3Ccircle cx='50' cy='95' r='12' fill='%23333'/%3E%3Ccircle cx='50' cy='95' r='6' fill='%23999'/%3E%3Ccircle cx='110' cy='95' r='12' fill='%23333'/%3E%3Ccircle cx='110' cy='95' r='6' fill='%23999'/%3E%3Ccircle cx='140' cy='95' r='12' fill='%23333'/%3E%3Ccircle cx='140' cy='95' r='6' fill='%23999'/%3E%3Crect x='42' y='55' width='70' height='20' rx='5' fill='%23e0f2fe'/%3E%3C/svg%3E",
      description: "Đào tạo lái xe tải với đội ngũ giảng viên kinh nghiệm",
    },
  ];

  const instructors = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      experience: "15 năm kinh nghiệm",
      rating: 4.9,
      students: 520,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%239ca3af'/%3E%3Cpath d='M50 100C67.6142 100 82 85.6142 82 68C82 50.3858 67.6142 36 50 36C32.3858 36 18 50.3858 18 68C18 85.6142 32.3858 100 50 100Z' fill='%239ca3af'/%3E%3C/svg%3E",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      experience: "10 năm kinh nghiệm",
      rating: 4.8,
      students: 430,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%239ca3af'/%3E%3Cpath d='M50 100C67.6142 100 82 85.6142 82 68C82 50.3858 67.6142 36 50 36C32.3858 36 18 50.3858 18 68C18 85.6142 32.3858 100 50 100Z' fill='%239ca3af'/%3E%3C/svg%3E",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      experience: "12 năm kinh nghiệm",
      rating: 4.7,
      students: 380,
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%239ca3af'/%3E%3Cpath d='M50 100C67.6142 100 82 85.6142 82 68C82 50.3858 67.6142 36 50 36C32.3858 36 18 50.3858 18 68C18 85.6142 32.3858 100 50 100Z' fill='%239ca3af'/%3E%3C/svg%3E",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Thị Hoa",
      course: "Hạng B1",
      comment:
        "Khóa học rất chất lượng, giảng viên nhiệt tình. Tôi đã thi đậu ngay lần đầu!",
      rating: 5,
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      course: "Hạng B2",
      comment:
        "Học phí hợp lý, thời gian đào tạo linh hoạt. Rất phù hợp với người đi làm.",
      rating: 4,
    },
    {
      id: 3,
      name: "Phạm Minh Đức",
      course: "Hạng C",
      comment:
        "Đội ngũ giảng viên chuyên nghiệp, thiết bị dạy học hiện đại. Tôi rất hài lòng.",
      rating: 5,
    },
  ];

  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trở thành tài xế lành nghề cùng DriveAcademy
              </h1>
              <p className="text-xl mb-8">
                Trung tâm đào tạo lái xe uy tín hàng đầu với đội ngũ giảng viên
                chuyên nghiệp và cơ sở vật chất hiện đại
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50">
                  Đăng ký tư vấn
                </button>
                <button className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10">
                  Xem khóa học
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <svg
                  className="w-full h-auto max-w-lg"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="400" height="300" rx="10" fill="#f1f5f9" />
                  <path
                    d="M330 230H70V110C70 96.7452 80.7452 86 94 86H306C319.255 86 330 96.7452 330 110V230Z"
                    fill="#2563eb"
                  />
                  <circle cx="120" cy="230" r="30" fill="#333" />
                  <circle cx="120" cy="230" r="15" fill="#999" />
                  <circle cx="280" cy="230" r="30" fill="#333" />
                  <circle cx="280" cy="230" r="15" fill="#999" />
                  <rect
                    x="94"
                    y="100"
                    width="212"
                    height="60"
                    rx="10"
                    fill="#e0f2fe"
                  />
                  <path d="M170 140H230V180H170V140Z" fill="#333" />
                  <path d="M185 155H215V165H185V155Z" fill="#f1f5f9" />
                </svg>
                <div className="absolute -right-6 -bottom-6 bg-white text-blue-600 rounded-full p-4 shadow-lg">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            fill="#fff"
          >
            <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tại sao chọn DriveAcademy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trung tâm đào tạo lái xe uy tín với hơn 10 năm kinh nghiệm, đội
              ngũ giảng viên chuyên nghiệp và cơ sở vật chất hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 12H20M4 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Đội xe hiện đại
              </h3>
              <p className="text-gray-600">
                Trang bị các dòng xe đời mới, bảo dưỡng thường xuyên, đảm bảo an
                toàn tối đa cho học viên trong quá trình học tập.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 21C3 16.5817 7.02944 13 12 13C16.9706 13 21 16.5817 21 21H3Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Giảng viên kinh nghiệm
              </h3>
              <p className="text-gray-600">
                Đội ngũ giảng viên có nhiều năm kinh nghiệm, kiên nhẫn và tận
                tâm, giúp học viên nắm vững kỹ năng lái xe an toàn.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Lịch học linh hoạt
              </h3>
              <p className="text-gray-600">
                Đa dạng thời gian học, kể cả buổi tối và cuối tuần, phù hợp với
                mọi đối tượng học viên, đặc biệt là người đi làm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Các khóa học
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đa dạng khóa học với nhiều hạng bằng lái, phù hợp với mọi nhu cầu
              của học viên
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {course.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded">
                      {course.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {course.price.toLocaleString("vi-VN")} đ
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50">
              Xem tất cả khóa học
            </button>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Đội ngũ giảng viên
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các giảng viên có nhiều năm kinh nghiệm trong lĩnh vực đào tạo lái
              xe, tận tâm và chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-slate-50 rounded-xl p-6 text-center"
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {instructor.name}
                </h3>
                <p className="text-blue-600 mb-3">{instructor.experience}</p>
                <div className="flex items-center justify-center text-yellow-400 mb-3">
                  <span className="mr-2">{instructor.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(instructor.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Đã đào tạo {instructor.students} học viên
                </p>
                <button className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                  Xem hồ sơ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5,200+</div>
              <p>Học viên đã đào tạo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p>Tỷ lệ đỗ kỳ thi sát hạch</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <p>Năm kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <p>Giảng viên chuyên nghiệp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nhận xét từ học viên
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hàng ngàn học viên đã thành công với khóa học của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-50 p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Khóa học {testimonial.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Sẵn sàng trở thành tài xế lành nghề?
              </h2>
              <p className="text-lg mb-8">
                Đăng ký ngay hôm nay để nhận tư vấn miễn phí và ưu đãi đặc biệt
                cho học viên mới
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50">
                  Đăng ký ngay
                </button>
                <button className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
