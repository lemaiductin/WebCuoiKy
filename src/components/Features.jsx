import React from "react";

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tại sao chọn DriveAcademy?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trung tâm đào tạo lái xe uy tín với hơn 10 năm kinh nghiệm, đội ngũ
            giảng viên chuyên nghiệp và cơ sở vật chất hiện đại
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
              Đội ngũ giảng viên có nhiều năm kinh nghiệm, kiên nhẫn và tận tâm,
              giúp học viên nắm vững kỹ năng lái xe an toàn.
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
  );
};

export default Features;
