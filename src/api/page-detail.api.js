import axios from "../utils/useAxios";

export const getPageCourse = () => {
  return axios.get("courses?populate=*");
};
export const getPageCoursesDetail = (documentId) => {
  return axios.get(`courses/${documentId}`);
};
