import { FiDownload, FiFileText, FiPlus } from "react-icons/fi";
import ExamList from "./ExamList";
import { BiTrash } from "react-icons/bi";
import AddNewContentExam from "./AddNewContentExam";
import DeleteContentExam from "./DeleteContentExam";
import { useState } from "react";

const Instructions = ({ exam, fetch }) => {
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  const handleDeleteFile = (data) => {
    setDataToDelete(data);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Mô tả bài tập</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {exam?.description || "Không có mô tả cụ thể."}
        </p>

        <div className="mb-6 mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh sách bài tập</h2>
            {(isTeacher || isAdmin) && (
              <button
                onClick={() => setShowAddFileModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiPlus className="mr-2" />
                Thêm bài tập
              </button>
            )}
          </div>

          <div className="border mt-5 border-gray-200 rounded-lg overflow-hidden">
            {exam?.exam_contents?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {exam?.exam_contents.map((file) => (
                  <li
                    key={file?.id}
                    className="p-4 flex justify-between items-center hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FiFileText className="mr-3 text-xl text-blue-500" />
                      <span className="font-medium text-gray-800">
                        {file?.file?.split("/").pop()}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = `http://localhost:1337${file?.file}`;
                          link.download = file?.file?.split("/").pop();
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <FiDownload />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                        onClick={() => handleDeleteFile(file)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Chưa có tài liệu nào.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal thêm tài liệu */}
      {showAddFileModal && (
        <AddNewContentExam
          onClose={() => setShowAddFileModal(false)}
          fetch={fetch}
        />
      )}

      {/* Modal xoá tài liệu */}
      {dataToDelete && (
        <DeleteContentExam
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={dataToDelete}
          fetch={fetch}
        />
      )}
    </>
  );
};

export default Instructions;
