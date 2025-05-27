import { useEffect, useState } from "react";
import AddNewContentExercise from "./AddNewContentExercise";
import DeleteContentExercise from "./DeleteContentExercise";
import { FiUpload, FiAward } from "react-icons/fi";
import { getExerciseContent } from "../../api/auth.api";
import { useParams } from "react-router-dom";
import ListExamSubmission from "./ListExamSubmission";
import { getAllGrade } from "../../api/grade.api";
import SubmitModal from "../GradesStudent/SubmitModal";

const ExamSubmission = ({ fetch }) => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const { examId } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [submissionData, setSubmissionData] = useState([]);
  const [studentGrade, setStudentGrade] = useState(null);

  useEffect(() => {
    fetchAllSubmissionByExamOfStudent();
    fetchStudentGrade();
  }, []);

  const handleDeleteFile = (submission) => {
    setItemToDelete(submission);
    setShowDeleteModal(true);
  };

  const fetchAllSubmissionByExamOfStudent = async () => {
    try {
      const res = await getExerciseContent();
      const allData = res.data?.data || [];

      const dataSubmissionOfExamOfStudent = allData.filter((item) => {
        return (
          String(item.examId) === String(examId) &&
          Number(item.userId) === Number(auth.id)
        );
      });

      setSubmissionData(dataSubmissionOfExamOfStudent);
    } catch (error) {
      console.error("Failed to fetch submission data:", error);
      return [];
    }
  };

  const fetchStudentGrade = async () => {
    try {
      const res = await getAllGrade();
      const allGrades = res.data.data;

      // Filter grades to find the current student's grade for this exam
      const myGrade = allGrades.find(
        (grade) =>
          grade.examId === examId && Number(grade.userId) === Number(auth.id)
      );

      if (myGrade) {
        setStudentGrade(myGrade);
      }
    } catch (error) {
      console.error("Failed to fetch grade data:", error);
    }
  };

  return (
    <div>
      <div>
        <>
          <h2 className="text-xl font-semibold mb-4">Nộp bài tập</h2>

          {studentGrade && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <FiAward className="text-yellow-500 text-2xl mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Kết quả đánh giá
                  </h3>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Điểm số</p>
                      <p className="text-xl font-bold text-blue-600">
                        {studentGrade.grade}/10
                      </p>
                    </div>
                    {studentGrade.feedback && (
                      <div className="flex-1 bg-white p-3 rounded-md shadow-sm">
                        <p className="text-sm text-gray-500">Nhận xét</p>
                        <p className="text-gray-700">{studentGrade.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
            >
              <FiUpload className="mx-auto text-3xl text-gray-400 mb-3" />
              <p className="text-gray-500 mb-4">
                Nhấn vào đây để tải lên bài nộp
              </p>
            </button>
          </div>
        </>
        <ListExamSubmission
          submissionData={submissionData}
          fetch={fetchAllSubmissionByExamOfStudent}
          onDelete={handleDeleteFile}
        />
      </div>
      {showAddModal && (
        <AddNewContentExercise
          onClose={() => setShowAddModal(false)}
          fetch={() => {
            fetchAllSubmissionByExamOfStudent();
            fetchStudentGrade();
          }}
        />
      )}
      {showDeleteModal && itemToDelete && (
        <DeleteContentExercise
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data={itemToDelete}
          fetch={() => {
            fetchAllSubmissionByExamOfStudent();
            fetchStudentGrade();
          }}
        />
      )}
    </div>
  );
};

export default ExamSubmission;
