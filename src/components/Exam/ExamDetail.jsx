import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getExamDetail } from "../../api/auth.api";
import Instructions from "./Instructions";
import ExamSubmission from "./ExamSubmission";
import SubmissionList from "../GradesStudent/SubmisssionList";
import Header from "../Header";

const ExamDetail = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [activeTab, setActiveTab] = useState("instructions");
  const auth = JSON.parse(localStorage.getItem("user"));
  const isAdmin = auth?.roleUser === "ADMIN";

  useEffect(() => {
    fetchExamDetail();
  }, [examId]);

  const fetchExamDetail = async () => {
    try {
      const response = await getExamDetail(examId);
      const examData = response.data.data;
      setExam(examData);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bài tập từ API:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-2xl mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-full">
              <FiFileText className="text-green-600" size={36} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                {exam?.title || "Bài tập"}
              </h1>
              <p className="text-gray-500 text-base mb-2 max-w-xl">
                {exam?.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  Hạn nộp: {formatDate(exam?.due_date || new Date())}
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  Cập nhật: {formatTime(exam?.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("instructions")}
              className={`py-3 px-1 border-b-2 font-semibold text-base transition-all duration-150 focus:outline-none ${
                activeTab === "instructions"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Hướng dẫn
            </button>
            {auth &&
              (auth.roleUser === "USER" || auth.roleUser === "ADMIN") && (
                <button
                  onClick={() => setActiveTab("submission")}
                  className={`py-3 px-1 border-b-2 font-semibold text-base transition-all duration-150 focus:outline-none ${
                    activeTab === "submission"
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Nộp bài
                </button>
              )}
            <button
              onClick={() => setActiveTab("feedback")}
              className={`py-3 px-1 border-b-2 font-semibold text-base transition-all duration-150 focus:outline-none ${
                activeTab === "feedback"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Chấm điểm
            </button>
          </nav>
        </div>
        <div className="mb-8">
          {activeTab === "instructions" && (
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow p-6">
              <Instructions exam={exam} fetch={fetchExamDetail} />
            </div>
          )}
        </div>
        <div className="mb-8">
          {activeTab === "submission" && (
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow p-6">
              <ExamSubmission fetch={fetchExamDetail} />
            </div>
          )}
        </div>
        <div className="mb-8">
          {activeTab === "feedback" && (
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow p-6">
              <SubmissionList />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamDetail;
