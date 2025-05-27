import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { gradeStudent } from "../../api/grade.api";

const SubmitModal = ({ data, show, onClose, fetch }) => {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const { examId } = useParams();
  const handleSubmit = async () => {
    const payload = {
      userId: data.user.data.id,
      examId: examId,
      grade: grade,
      feedback: feedback,
    };

    const res = await gradeStudent(payload);
    onClose();
    fetch();
    alert("Đã chấm điểm!");
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {data?.user?.data?.fullname || data?.user?.data?.username}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm uppercase">
                    {data?.user?.data?.fullname?.charAt(0) ||
                      data?.user?.data?.username?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {data?.user?.data?.fullname || data?.user?.data?.username}
                    </h3>
                  </div>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "info"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Thông tin học viên
                  </button>

                  <button
                    onClick={() => setActiveTab("files")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "files"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Bài tập đã nộp
                  </button>
                  <button
                    onClick={() => setActiveTab("grading")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "grading"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Chấm điểm/Nhận xét
                  </button>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "info" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Thông tin học viên
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Họ và tên</p>
                        <p className="font-medium">
                          {data.user.data.fullname || "Chưa cập nhật"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Mã học viên</p>
                        <p className="font-medium">
                          STUDENT-{data.user.data.id}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{data.user.data.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "files" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Bài tập đã nộp : ({data.submissions.length}) files
                    </h3>
                    <div className="space-y-2">
                      {data.submissions.map((file) => (
                        <div
                          key={data.submissions.id}
                          className={`flex items-center p-3 border `}
                        >
                          <div className="flex-1">
                            <p className="font-medium truncate">
                              {" "}
                              {file?.file?.split("/").pop()}
                            </p>
                            <p className="text-sm text-gray-500"></p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-800 rounded-full cursor-pointer hover:bg-blue-50"
                              onClick={() => {
                                // Handle file download
                                const link = document.createElement("a");
                                link.href = `http://localhost:1337${file?.file}`;
                                link.download = `http://localhost:1337${file?.file}`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <FiDownload />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "grading" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Chấm điểm
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="grade"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Chấm điểm
                            </label>
                            <input
                              type="number"
                              id="grade"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Nhập điểm"
                              min={0}
                              max={10}
                              step={0.1}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="feedback"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nhận xét
                          </label>
                          <textarea
                            id="feedback"
                            rows={5}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Thêm nhận xét...."
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {activeTab === "grading" && (
                  <span>
                    Total Score: <span className="font-medium">- / 100</span>
                  </span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 cursor-pointer  text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitModal;
