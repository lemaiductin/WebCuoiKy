import axios from "axios";
import { data } from "react-router-dom";

export const registerUser = (userData) => {
  return axios.post("http://localhost:1337/api/auth/local/register", userData);
};
export const changePassword = (userData) => {
  return axios.post("http://localhost:1337/api/auth/change-password", userData);
};
export const loginUser = (userData) => {
  return axios.post("http://localhost:1337/api/auth/local", userData);
};

// export const getUserList = (userData) => {
//   return axios.get("http://localhost:1337/api/users", userData);
// };
export const getUserList = (page = 1, pageSize = 1) => {
  return axios.get(
    `http://localhost:1337/api/users?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};
export const deleteUser = (id) => {
  return axios.delete(`http://localhost:1337/api/users/${id}`);
};
export const updateUser = (id, data) => {
  return axios.put(`http://localhost:1337/api/users/${id}`, data);
};
export const getUserDetail = (id) => {
  return axios.get(`http://localhost:1337/api/users/${id}`);
};
// api khoa hoc
export const getCoursesDetail = (documentId) => {
  return axios.get(`http://localhost:1337/api/courses/${documentId}`);
};
export const getCourses = () => {
  return axios.get("http://localhost:1337/api/courses?populate=*");
};

export const deleteCourse = (id) => {
  return axios.delete(`http://localhost:1337/api/courses/${id}`);
};

export const updateCourse = (id, data) => {
  return axios.put(`http://localhost:1337/api/courses/${id}`, data);
};

export const createCourse = (data) => {
  return axios.post("http://localhost:1337/api/courses", data);
};
// documents
export const getDocuments = () => {
  return axios.get("http://localhost:1337/api/documents");
};
export const getDocumentDetail = (id) => {
  return axios.get(
    `http://localhost:1337/api/documents/${id}?populate=document_contents`
  );
};

export const addDocument = (data) => {
  return axios.post("http://localhost:1337/api/documents", data);
};
export const deleteDocument = (docId) => {
  return axios.delete(`http://localhost:1337/api/documents/${docId}`);
};
export const updateDocument = (id, data) => {
  return axios.put(`http://localhost:1337/api/documents/${id}`, data);
};
// documentContents
export const getDocumentcontent = () => {
  return axios.get(`http://localhost:1337/api/document-contents`);
};

export const getDocumentDetailContent = (id) => {
  return axios.get(`http://localhost:1337/api/document-contents/${id}`);
};

export const createDocumentContent = (data) => {
  return axios.post("http://localhost:1337/api/document-contents", data);
};

export const deleteDocumentContent = (id) => {
  return axios.delete(`http://localhost:1337/api/document-contents/${id}`);
};

// exam
export const getExams = () => {
  return axios.get("http://localhost:1337/api/exams");
};
export const getExamDetail = (id) => {
  return axios.get(
    `http://localhost:1337/api/exams/${id}?populate=exam_contents`
  );
};

export const updateExam = (id, data) => {
  return axios.get(`http://localhost:1337/api/exams/${id}`, data);
};
export const addExam = (data) => {
  return axios.post("http://localhost:1337/api/exams", data);
};
export const deleteExam = (examId) => {
  return axios.delete(`http://localhost:1337/api/exams/${examId}`);
};
// exam content
export const getExamContent = () => {
  return axios.get(`http://localhost:1337/api/exam-contents`);
};
export const getExamContentDetail = (id) => {
  return axios.get(`http://localhost:1337/api/exam-contents/${id}`);
};
export const createExamContent = (data) => {
  return axios.post("http://localhost:1337/api/exam-contents", data);
};

export const updateExamContent = (id, data) => {
  return axios.post(`http://localhost:1337/api/exam-contents/${id}`, data);
};
export const deleteExamContent = (id) => {
  return axios.delete(`http://localhost:1337/api/exam-contents/${id}`);
};
// exercise-content
export const getExerciseContent = () => {
  return axios.get(`http://localhost:1337/api/exercise-contents`);
};

export const updateExerciseContent = (id, data) => {
  return axios.put(`http://localhost:1337/api/exercise-contents/${id}`, data);
};
export const deleteExerciseContent = (id) => {
  return axios.delete(`http://localhost:1337/api/exercise-contents/${id}`);
};
