import axios from "axios";

export const registerUser = (userData) => {
  return axios.post("http://localhost:1337/api/auth/local/register", userData);
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
export const getCoursesDetail = (id) => {
  return axios.get(`http://localhost:1337/api/courses/${id}`);
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
export const getDocuments = (id) => {
  return axios.get(
    `http://localhost:1337/api/documents?filters[course][id][$eq]=${id}&populate=*`
  );
};

export const uploadDocument = (data) => {
  return axios.post("http://localhost:1337/api/documents", data);
};
export const deleteDocument = (id) => {
  return axios.delete(`http://localhost:1337/api/documents/${id}`);
};
