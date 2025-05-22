import React from "react";

const Statistics = () => {
  return (
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
  );
};

export default Statistics;
