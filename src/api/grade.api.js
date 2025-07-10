import axios from "../utils/useAxios";

export const gradeStudent = (payload) => {
  return axios.post("grades", {
    data: payload,
  });
};

export const getAllGrade = () => {
  return axios.get("grades");
};

export const getGradeFollowStudent = (id) => {
  return axios.get(`grades/${id}`);
};

export const deleteGrade = (id) => {
  return axios.delete(`grades/${id}`);
};
