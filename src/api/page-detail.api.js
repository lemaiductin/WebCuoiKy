export const getPageCourse = () => {
  return axios.get("http://localhost:1337/api/courses?populate=*");
};
export const getPageCoursesDetail = (documentId) => {
  return axios.get(`http://localhost:1337/api/courses/${documentId}`);
};
