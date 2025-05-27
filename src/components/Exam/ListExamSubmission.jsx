import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";

const ListExamSubmission = ({ submissionData, fetch, onDelete }) => {
  // console.log("submissionData ", submissionData);

  useEffect(() => {
    fetch();
  }, [submissionData]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Danh sách bài nộp
        </h2>

        <div className="space-y-4">
          {submissionData.map((submission) => {
            return (
              <div
                key={submission.id}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
              >
                {/* Header của bài nộp */}
                <div className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FiFileText className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {submission?.file?.split("/").pop()}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      Thời gian nộp:{" "}
                      {moment(submission.createdAt).format(
                        "HH:mm:ss, DD-MM-YYYY"
                      )}
                    </span>
                    <BiTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => onDelete(submission)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListExamSubmission;
