import React from "react";

const Instructors = () => {
  return (
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
  );
};

export default Instructors;
