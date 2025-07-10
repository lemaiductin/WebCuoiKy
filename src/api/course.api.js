import axios from "../utils/useAxios";
export const studentRegisterCourses = (data) => {
  return axios.post("student-courses", {
    data: data,
  });
};
export const getAllRequestStudentRegisterCourse = () => {
  return axios.get("student-courses");
};
export const approveRequestStudentRegisterCourse = (id, data) => {
  return axios.put(`student-courses/${id}`, {
    data: data,
  });
};
export const deleteReqCourse = (id) => {
  return axios.delete(`student-courses/${id}`);
};
