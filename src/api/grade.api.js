import axios from "axios";

export const gradeStudent = (payload) => {
  return axios.post("http://localhost:1337/api/grades", {
    data: payload,
  });
};

export const getAllGrade = () => {
  return axios.get("http://localhost:1337/api/grades");
};

export const getGradeFollowStudent = (id) => {
  return axios.get(`http://localhost:1337/api/grades/${id}`);
};

export const deleteGrade = (id) => {
  return axios.delete(`http://localhost:1337/api/grades/${id}`);
};
