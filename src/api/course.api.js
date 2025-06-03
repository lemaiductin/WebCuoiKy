import axios from "axios";

export const studentRegisterCourses = (data) => {
  return axios.post("http://localhost:1337/api/student-courses", {
    data: data,
  });
};
export const getAllRequestStudentRegisterCourse = () => {
  return axios.get("http://localhost:1337/api/student-courses");
};
export const approveRequestStudentRegisterCourse = (id, data) => {
  return axios.put(`http://localhost:1337/api/student-courses/${id}`, {
    data: data,
  });
};
export const deleteReqCourse = (id) => {
  return axios.delete(`http://localhost:1337/api/student-courses/${id}`);
};
