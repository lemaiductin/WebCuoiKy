import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Toast from "../common/Toast";
const AddNewContentExercise = ({ onClose, fetch }) => {
  const { examId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      setError("Vui lòng chọn ít nhất một tệp");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Upload files to Strapi
      const uploadRes = await axios.post(
        "http://localhost:1337/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedFiles = uploadRes.data;
      const uploadPromises = uploadedFiles.map(async (file) => {
        return axios.post("http://localhost:1337/api/exercise-contents", {
          data: {
            userId: user.id,
            examId: examId,
            exam: examId,
            file: file.url,
          },
        });
      });
      const results = await Promise.all(uploadPromises);
      setToast({ message: "Nộp bài tập thành công!", type: "success" });
      fetch();

      // Reset form
      setSelectedFiles([]);
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error?.message ||
          "Đã xảy ra lỗi khi tải lên. Vui lòng thử lại."
      );
      setToast({
        message:
          err.response?.data?.error?.message ||
          "Đã xảy ra lỗi khi tải lên. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Validate each file
    const invalidFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setError(
        `Một số tệp vượt quá giới hạn 10MB: ${invalidFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    setSelectedFiles(files);
    setError(null);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Nộp bài tập</h3>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* File upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Tệp đính kèm *</label>
          <div
            className={`border-2 border-dashed rounded text-center cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedFiles.length > 0
                ? "border-green-500 bg-green-50"
                : "border-gray-300 p-4"
            }`}
            onClick={() =>
              !loading && document.getElementById("fileInput").click()
            }
          >
            {selectedFiles.length > 0 ? (
              <div className="p-3 space-y-2 max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="text-left truncate">
                      <p className="font-medium text-green-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("fileInput").click();
                  }}
                >
                  Thêm tệp khác
                </button>
              </div>
            ) : (
              <p className="text-gray-500">
                {loading
                  ? "Đang xử lý..."
                  : "Chọn hoặc kéo thả nhiều tệp vào đây"}
              </p>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Progress bar */}
        {loading && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Đang tải lên...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || selectedFiles.length === 0}
            className={`px-4 py-2 text-white rounded-md transition-colors ${
              loading || selectedFiles.length === 0
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang tải lên...
              </span>
            ) : (
              `Nộp ${selectedFiles.length} tệp`
            )}
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AddNewContentExercise;
