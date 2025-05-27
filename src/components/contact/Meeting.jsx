import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaCar,
  FaUser,
  FaPaperPlane,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { motion } from "framer-motion";
import Header from "../Header";

const Meeting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h."
      );
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Địa Chỉ",
      details: [
        "123 Đường Lê Lợi, Quận 1, TP.HCM",
        "Chi nhánh 2: 456 Nguyễn Huệ, Quận 3",
      ],
      color: "from-red-500 to-pink-500",
    },
    {
      icon: FaPhoneAlt,
      title: "Điện Thoại",
      details: ["(028) 3823 4567", "Hotline: 0909 123 456"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["info@daotaolaixe.com", "support@daotaolaixe.com"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FaClock,
      title: "Giờ Làm Việc",
      details: [
        "Thứ 2 - Thứ 6: 7:30 - 17:30",
        "Thứ 7: 7:30 - 12:00",
        "Chủ nhật: Nghỉ",
      ],
      color: "from-purple-500 to-violet-500",
    },
  ];

  const features = [
    {
      icon: FaCar,
      title: "Đào tạo chất lượng cao",
      desc: "Giáo viên giàu kinh nghiệm",
    },
    {
      icon: FaCheckCircle,
      title: "Tỷ lệ đỗ cao",
      desc: "98% học viên thi đỗ lần đầu",
    },
    {
      icon: HiOutlineLocationMarker,
      title: "Địa điểm thuận lợi",
      desc: "Gần trung tâm thành phố",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-8"
            >
              <FaCar className="text-6xl text-white mx-auto mb-6" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Trung tâm đào tạo lái xe hàng đầu với đội ngũ giáo viên chuyên
              nghiệp và hệ thống cơ sở vật chất hiện đại nhất
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 text-white"
                >
                  <feature.icon className="text-2xl" />
                  <div className="text-left">
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-sm text-white/80">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Thông Tin Liên Hệ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn với đội ngũ tư
              vấn viên chuyên nghiệp
            </p>
          </motion.div>

          {/* Contact Information Cards - Separated Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div
                  className={`bg-gradient-to-r ${info.color} p-6 relative overflow-hidden`}
                >
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 right-2 w-8 h-8 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="text-3xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {info.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {info.details.map((detail, i) => (
                      <div
                        key={i}
                        className="flex items-start group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mt-2 mr-3"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Contact Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {index === 1 && ( // Phone card
                      <a
                        href="tel:0909123456"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors group"
                      >
                        <FaPhoneAlt className="mr-2 group-hover:animate-pulse" />
                        Gọi ngay
                      </a>
                    )}
                    {index === 2 && ( // Email card
                      <a
                        href="mailto:info@daotaolaixe.com"
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm transition-colors group"
                      >
                        <FaEnvelope className="mr-2 group-hover:animate-pulse" />
                        Gửi email
                      </a>
                    )}
                    {index === 0 && ( // Address card
                      <a
                        href="#map"
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium text-sm transition-colors group"
                      >
                        <FaMapMarkerAlt className="mr-2 group-hover:animate-pulse" />
                        Xem bản đồ
                      </a>
                    )}
                    {index === 3 && ( // Working hours card
                      <span className="inline-flex items-center text-purple-600 font-medium text-sm">
                        <FaClock className="mr-2" />
                        Đang mở cửa
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            id="map"
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Vị Trí Trung Tâm
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Tìm đường đến trung tâm đào tạo
                  </p>
                </div>
                <HiOutlineLocationMarker className="text-4xl text-white" />
              </div>
            </div>
            <div className="p-4 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.126365377763!2d106.69982631526072!3d10.80182646171297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca99339b29%3A0xa10097f196f43f19!2zMjM1IEhvw6BuZyBWxINuLCBQaMaw4budbmcgMTIsIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>
          </motion.div>

          {/* Social Media & Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Theo Dõi Chúng Tôi
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-pink-600 text-white p-4 rounded-xl hover:bg-pink-700 transition-colors"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition-colors"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
              <p className="text-gray-600 mt-4">
                Kết nối với chúng tôi trên mạng xã hội để cập nhật tin tức mới
                nhất
              </p>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Liên Hệ Nhanh</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-3" />
                  <span>Hotline: 0909 123 456</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-3" />
                  <span>info@daotaolaixe.com</span>
                </div>
              </div>
              <p className="mt-4 text-green-100">
                Gọi ngay để được tư vấn miễn phí!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Meeting;
