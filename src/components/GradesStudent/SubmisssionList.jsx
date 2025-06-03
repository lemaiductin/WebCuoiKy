import React, { useEffect, useState } from "react";
import { FiSearch, FiClock, FiUser, FiTrash2 } from "react-icons/fi";
import SubmitModal from "./SubmitModal";
import {
  getExerciseContent,
  getUserDetail,
  deleteExerciseContent,
} from "../../api/auth.api";
import moment from "moment/moment";
import { getAllGrade, deleteGrade } from "../../api/grade.api";
import { useParams } from "react-router-dom";
import Toast from "../common/Toast";

const SubmissionList = () => {
  const { examId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [studentSubmission, setStudentSubmission] = useState([]);
  const [studentGrade, setStudentGrade] = useState([]);
  const [grades, setGrades] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.roleUser === "ADMIN";
  const isTeacher = user?.roleUser === "TEACHER";
  useEffect(() => {
    fetchAllSubmissionData();
    fetchAllMyGrade();
  }, [examId]);

  const fetchAllSubmissionData = async () => {
    try {
      const submissions = await getExerciseContent();
      const allSubmissions = submissions.data.data;

      // 1. Lọc các submission có userId
      const submittedUsers = allSubmissions.filter((item) => item.userId);

      // 2. Lấy userId duy nhất
      const uniqueUserIds = [
        ...new Set(submittedUsers.map((item) => item.userId)),
      ];

      // 3. Lấy thông tin user và gộp với submissions
      const studentSubmission = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const user = await getUserDetail(userId);
          const userSubmissions = submittedUsers.filter(
            (item) => item.userId === userId
          );
          return { user, submissions: userSubmissions };
        })
      );

      setStudentSubmission(studentSubmission);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user đã nộp bài:", error);
    }
  };

  const fetchAllMyGrade = async () => {
    try {
      const res = await getAllGrade();
      const allGrades = res.data.data;

      const filteredGrades = allGrades.filter(
        (grade) => grade.examId === examId
      );

      console.log("Danh sách điểm theo examId:", filteredGrades);
      setGrades(filteredGrades);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách điểm:", error);
    }
  };

  const handleGrade = (data) => {
    setStudentGrade(data);
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;

    setIsDeleting(true);
    try {
      const userId = studentToDelete.user.data.id;

      // 1. Xóa tất cả bài nộp của học viên này trong exam hiện tại,submissions là mảng các bài nộp của một học viên, submission là từng bài nộp.
      const deleteSubmissionPromises = studentToDelete.submissions.map(
        (submission) => deleteExerciseContent(submission.documentId)
      );
      //Promise là cách JS xử lý thao tác bất đồng bộ (gọi API xóa), dùng Promise.all để xóa nhiều bài cùng lúc.
      await Promise.all(deleteSubmissionPromises);

      // 2. Xóa điểm và nhận xét của học viên (nếu có)
      const gradeToDelete = grades.find((grade) => grade.userId === userId);
      if (gradeToDelete) {
        await deleteGrade(gradeToDelete.documentId);
      }

      setToast({
        message: "Đã xóa tất cả dữ liệu của học viên thành công!",
        type: "success",
      });
      setShowDeleteConfirm(false);
      setStudentToDelete(null);

      // Refresh dữ liệu
      fetchAllSubmissionData();
      fetchAllMyGrade();
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu học viên:", error);
      setToast({
        message: "Xóa dữ liệu học viên thất bại!",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter submissions based on search term
  const filteredSubmissions = studentSubmission.filter((submission) => {
    if (!searchTerm) return true;

    const fullname = submission.user.data.fullname || "";
    const username = submission.user.data.username || "";
    const email = submission.user.data.email || "";

    return (
      fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Danh sách học viên đã nộp bài
          </h1>
          <p className="text-gray-600">
            {filteredSubmissions?.length} học viên
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm "
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Submissions table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Học viên
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thời gian nộp
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Điểm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nhận xét
              </th>
              {isTeacher && (
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => {
                const userId = submission.user.data.id;
                const gradeEntry = grades.find(
                  (grade) => grade.userId === userId
                );

                return (
                  <tr
                    key={userId}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      {
                        isTeacher && setOpenModal(true);
                        handleGrade(submission);
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.user.data.fullname ||
                              submission.user.data.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        {moment(submission.submissions[0].createdAt).format(
                          "HH:mm:ss - DD/MM/YYYY"
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-800">
                        {gradeEntry ? gradeEntry.grade : "—"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                      {gradeEntry ? gradeEntry.feedback : "—"}
                    </td>
                    {isTeacher && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(submission);
                          }}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors"
                          title="Xóa tất cả dữ liệu của học viên"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : searchTerm ? (
              <tr>
                <td
                  colSpan={isTeacher ? "5" : "4"}
                  className="px-6 py-4 text-center"
                >
                  <div className="text-gray-400 my-8">
                    <FiSearch className="mx-auto text-4xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-600">
                      Không tìm thấy học viên nào
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Không tìm thấy học viên với từ khóa "{searchTerm}"
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={isTeacher ? "5" : "4"}
                  className="px-6 py-4 text-center"
                >
                  <div className="text-gray-400 my-8">
                    <FiSearch className="mx-auto text-4xl mb-3" />
                    <h3 className="text-lg font-medium text-gray-600">
                      Không tìm thấy bài nộp nào
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Chưa có học viên nào nộp bài cho bài tập này
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openModal && (
        <SubmitModal
          data={studentGrade}
          show={openModal}
          onClose={() => setOpenModal(!openModal)}
          fetch={fetchAllMyGrade}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận xóa tất cả dữ liệu học viên?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tất cả dữ liệu của học viên{" "}
              <span className="font-medium">
                {studentToDelete?.user?.data?.fullname ||
                  studentToDelete?.user?.data?.username}
              </span>{" "}
              không?
              <br />
              <br />
              <span className="text-red-600 font-medium">Điều này sẽ xóa:</span>
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>{studentToDelete?.submissions?.length || 0} bài nộp</li>
                <li>Điểm và nhận xét (nếu có)</li>
              </ul>
              <br />
              <span className="text-red-600">
                Hành động này không thể hoàn tác!
              </span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setStudentToDelete(null);
                }}
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                onClick={confirmDeleteStudent}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Đang xóa..." : "Xóa tất cả"}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default SubmissionList;
