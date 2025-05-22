import React from "react";

const CTA = () => {
  return (
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
  );
};

export default CTA;
