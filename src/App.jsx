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
import TeacherDashboard from "./components/TeacherDashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/courseList" element={<MyCourseList />} />
        <Route path="/addCourse" element={<CreateCourse />} />
        <Route path="/updateCourse/:documentId" element={<UpdateCourse />} />
        <Route path="/course-details/:documentId" element={<CourseDetails />} />
        <Route path="/upload" element={<UploadMaterials />} />
        <Route path="/approve" element={<TeacherDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
};

export default App;
