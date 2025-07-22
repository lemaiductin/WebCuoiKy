import axios from "../utils/useAxios";

export const registerUser = (userData) => {
  return axios.post("auth/local/register", userData);
};
export const changePassword = (userData) => {
  return axios.post("auth/change-password", userData);
};

// currentPassword,
//         password: newPassword,
//         passwordConfirmation: confirmPassword,

export const loginUser = (userData) => {
  return axios.post("auth/local", userData);
};

// export const getUserList = (userData) => {
//   return axios.get("users", userData);
// };
export const getUserList = (page = 1, pageSize = 10000) => {
  return axios.get(
    `users?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
  );
};
export const getAllUsers = () => {
  return axios.get("users");
};

// dòng 43 MyCourseList.jsx
export const getCourseList = () => {
  return axios.get("courses?populate=*");
};

export const deleteUser = (id) => {
  return axios.delete(`users/${id}`);
};
export const updateUser = (id, data) => {
  return axios.put(`users/${id}`, data);
};
export const getUserDetail = (id) => {
  return axios.get(`users/${id}`);
};
// api khoa hoc
export const getCoursesDetail = (documentId) => {
  return axios.get(`courses/${documentId}`);
};
export const getCourses = () => {
  return axios.get("courses?populate=*");
};

export const deleteCourse = (id) => {
  return axios.delete(`courses/${id}`);
};

export const updateCourse = (id, data) => {
  return axios.put(`courses/${id}`, data);
};

export const createCourse = (data) => {
  return axios.post("courses", data);
};
export const uploadCourse = (formData) => {
  return axios.post("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const createCourseWithImage = (form, imageId) => {
  return axios.post("courses", {
    data: {
      ...form,
      img: imageId,
    },
  });
};

export const getCoursesByDocumentId = (documentId) => {
  return axios.get(`courses?filters[documentId][$eq]=${documentId}&populate=*`);
};

// documents
export const getDocuments = () => {
  return axios.get("documents");
};
export const getDocumentDetail = (id) => {
  return axios.get(`documents/${id}?populate=document_contents`);
};

export const addDocument = (data) => {
  return axios.post("documents", data);
};
export const deleteDocument = (docId) => {
  return axios.delete(`documents/${docId}`);
};
export const updateDocument = (id, data) => {
  return axios.put(`documents/${id}`, data);
};
// documentContents
export const getDocumentcontent = () => {
  return axios.get(`document-contents`);
};

export const getDocumentDetailContent = (id) => {
  return axios.get(`document-contents/${id}`);
};

export const createDocumentContent = (data) => {
  return axios.post("document-contents", data);
};

export const deleteDocumentContent = (id) => {
  return axios.delete(`document-contents/${id}`);
};

// exam
export const getExams = () => {
  return axios.get("exams");
};
export const getExamDetail = (id) => {
  return axios.get(`exams/${id}?populate=exam_contents`);
};

export const updateExam = (id, data) => {
  return axios.get(`exams/${id}`, data);
};
export const addExam = (data) => {
  return axios.post("exams", data);
};
export const deleteExam = (examId) => {
  return axios.delete(`exams/${examId}`);
};
// exam content
export const getExamContent = () => {
  return axios.get(`exam-contents`);
};
export const getExamContentDetail = (id) => {
  return axios.get(`exam-contents/${id}`);
};
export const createExamContent = (data) => {
  return axios.post("exam-contents", data);
};

export const updateExamContent = (id, data) => {
  return axios.post(`exam-contents/${id}`, data);
};
export const deleteExamContent = (id) => {
  return axios.delete(`exam-contents/${id}`);
};
// exercise-content
export const getExerciseContent = () => {
  return axios.get(`exercise-contents`);
};

export const updateExerciseContent = (id, data) => {
  return axios.put(`exercise-contents/${id}`, data);
};
export const deleteExerciseContent = (id) => {
  return axios.delete(`exercise-contents/${id}`);
};
