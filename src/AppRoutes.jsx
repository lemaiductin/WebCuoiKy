import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import UserList from "./components/Admin/User/UserList";
import Profile from "./components/Client/Profile";
import Courses from "./components/Courses";
import MyCourseList from "./components/MyCourseList";
import CreateCourse from "./components/CreateCourse";
import CourseDetails from "./components/CourseDetails";
import UpdateCourse from "./components/UpdateCourse";
import UploadMaterials from "./components/UploadMaterials";
import TeacherDashboard from "./components/TeacherDashBoard";
import DocumentDetail from "./components/Document/DocumentDetail";
import ExamDetail from "./components/Exam/ExamDetail";
import { AddDocument } from "./components/Document/AddDocument";
import { AddExam } from "./components/Exam/AddExam";
import UpdateDocument from "./components/Document/UpdateDocument";
import UpdateExam from "./components/Exam/UpdateExam";

import { Contact } from "lucide-react";
import TimeTable from "./components/TableTime.jsx/schedule";
import Meeting from "./components/contact/Meeting";
import ChangePassword from "./components/ChangePass";
import MyRequest from "./components/Student/MyRequest";
import PageCourseDetail from "./components/PageCourseDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/users" element={<UserList />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/my-request/:tinId" element={<MyRequest />} />
      <Route path="/courseList" element={<MyCourseList />} />
      <Route path="/addCourse" element={<CreateCourse />} />
      <Route path="/updateCourse/:documentId" element={<UpdateCourse />} />
      <Route path="/course-details/:documentId" element={<CourseDetails />} />
      <Route path="/page-course/:documentId" element={<PageCourseDetail />} />
      <Route
        path="/course-details/:documentId/document/:docId"
        element={<DocumentDetail />}
      />
      <Route
        path="/course-details/:documentId/createDocument"
        element={<AddDocument />}
      />
      <Route path="/UpdateDocument/:docId" element={<UpdateDocument />} />
      <Route
        path="/course-details/:documentId/exams/:examId"
        element={<ExamDetail />}
      />
      <Route
        path="/course-details/:documentId/createExam"
        element={<AddExam />}
      />
      <Route path="/UpdateExam/:docId" element={<UpdateExam />} />
      <Route path="/upload" element={<UploadMaterials />} />
      <Route path="/approve" element={<TeacherDashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Meeting />} />
      <Route path="/schedule" element={<TimeTable />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="*" element={<NotFound></NotFound>} />
    </Routes>
  );
};

export default AppRoutes;
