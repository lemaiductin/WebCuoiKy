import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-blue-600 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trở thành tài xế lành nghề
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
  );
};

export default HeroSection;
