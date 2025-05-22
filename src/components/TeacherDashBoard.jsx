import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isTeacher = currentUser?.roleUser === "TEACHER";
  const isUser = currentUser?.roleUser === "USER";
  const isAdmin = currentUser?.roleUser === "ADMIN";

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/courses?populate=*"
      );

      // Log dữ liệu để debug
      console.log("Current user ID:", currentUser.id);

      if (isTeacher || isAdmin) {
        setRegistrations(response.data.data);
      } else if (isUser) {
        // Đọc trường đúng theo cấu trúc dữ liệu từ Strapi
        const acceptedCourses = response.data.data.filter((course) => {
          // Log chi tiết từng khóa học để debug
          console.log(
            `Checking course ${course?.NameCourse || course.NameCourse}`
          );

          // Kiểm tra đầy đủ - course.data hoặc data.attributes tùy cấu trúc API
          const regStatus =
            course?.registrationStatus ||
            course.data?.registrationStatus ||
            course.registrationStatus;

          // Debug log thông tin status
          console.log("Registration status:", regStatus);

          // Kiểm tra cả string và number
          return (
            regStatus &&
            (regStatus[currentUser.documentId] === "accepted" ||
              regStatus[String(currentUser.documentId)] === "accepted")
          );
        });

        console.log("Filtered courses:", acceptedCourses.length);
        setRegistrations(acceptedCourses);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleApprove = async (courseId, userId) => {
    try {
      // Log for debugging
      console.log(`Approving courseId: ${courseId}, userId: ${userId}`);

      // Find the course by ID or documentId
      const course = registrations.find(
        (c) => c.id === courseId || c.documentId === courseId
      );

      if (!course) {
        console.error(`Course with ID ${courseId} not found`);
        return;
      }

      console.log("Found course for approval:", course);

      // Get registration status from the appropriate location
      const existingStatus =
        course.registrationStatus || course?.registrationStatus || {};

      // Create a new status object
      const newStatus = { ...existingStatus };

      // Lưu với cả ID gốc và dạng string để đảm bảo
      newStatus[userId] = "accepted";
      newStatus[String(userId)] = "accepted";

      // Log thông tin debug
      console.log("User ID đang phê duyệt:", userId);
      console.log("Trạng thái mới:", newStatus);

      console.log("Status sau khi duyệt:", newStatus);

      // Đảm bảo chúng ta đang sử dụng ID thực tế của khóa học từ đối tượng course
      console.log("Course object:", course);
      // Sử dụng course.id nếu có, không thì mới dùng courseId từ tham số
      const actualCourseId = course.id;
      console.log("ID khóa học thực tế sẽ gửi lên API:", actualCourseId);

      // Dùng đúng endpoint API - thử dùng documentId thay vì id
      const courseDocumentId = course.documentId;
      console.log("DocumentID sẽ gửi lên API:", courseDocumentId);

      const response = await axios.put(
        `http://localhost:1337/api/courses/${courseDocumentId}`,
        {
          data: { registrationStatus: newStatus },
        }
      );

      console.log("Response sau khi duyệt:", response.data);
      alert("Yêu cầu đã được chấp thuận!");
      fetchRegistrations();
    } catch (error) {
      console.error("Lỗi khi chấp thuận yêu cầu:", error);
    }
  };

  const handleReject = async (courseId, userId) => {
    try {
      // Log for debugging
      console.log(`Rejecting courseId: ${courseId}, userId: ${userId}`);

      // Find the course by ID or documentId
      const course = registrations.find(
        (c) => c.id === courseId || c.documentId === courseId
      );

      if (!course) {
        console.error(`Course with ID ${courseId} not found`);
        return;
      }

      console.log("Found course for rejection:", course);

      // Get registration status from the appropriate location
      const existingStatus =
        course.registrationStatus || course?.registrationStatus || {};

      // Create a new status object
      const newStatus = { ...existingStatus };

      // Lưu với cả ID gốc và dạng string để đảm bảo
      newStatus[userId] = "rejected";
      newStatus[String(userId)] = "rejected";

      // Log thông tin debug
      console.log("User ID đang từ chối:", userId);
      console.log("Trạng thái mới:", newStatus);

      console.log("Status sau khi từ chối:", newStatus);

      // Đảm bảo chúng ta đang sử dụng ID thực tế của khóa học từ đối tượng course
      console.log("Course object:", course);
      // Sử dụng course.id nếu có, không thì mới dùng courseId từ tham số
      const actualCourseId = course.id;
      console.log("ID khóa học thực tế sẽ gửi lên API:", actualCourseId);

      // Dùng đúng endpoint API - thử dùng documentId thay vì id
      const courseDocumentId = course.documentId;
      console.log("DocumentID sẽ gửi lên API:", courseDocumentId);

      await axios.put(`http://localhost:1337/api/courses/${courseDocumentId}`, {
        data: { registrationStatus: newStatus },
      });

      alert("Yêu cầu đã bị từ chối!");
      fetchRegistrations();
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
    }
  };

  if (loading) {
    return <p>Đang tải danh sách yêu cầu...</p>;
  }

  if (registrations.length === 0) {
    return <p>Không có yêu cầu đăng ký nào.</p>;
  }

  // Debug - log registrations before rendering
  console.log("Registrations before rendering:", registrations);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Danh sách yêu cầu đăng ký
      </h2>
      <ul>
        {registrations.map((course) => {
          // Debug each course in render
          console.log("Rendering course:", course);

          // Determine where registrationStatus is stored based on API structure
          const registrationStatus =
            course.registrationStatus || course?.registrationStatus;

          console.log("Registration status for rendering:", registrationStatus);

          // Skip if no registration status
          if (!registrationStatus) return null;

          // Get course ID and name from appropriate places
          const courseId = course.id || course.documentId;
          const courseName = course.NameCourse;

          return Object.entries(registrationStatus)
            .filter(([userId, status]) => status === "pending")
            .map(([userId]) => (
              <li
                key={courseId + "-" + userId}
                className="mb-4 p-4 border rounded-lg shadow"
              >
                <h3 className="text-lg font-bold">Khóa học: {courseName}</h3>
                <p>Học viên: {userId}</p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleApprove(courseId, userId)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Chấp thuận
                  </button>
                  <button
                    onClick={() => handleReject(courseId, userId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Từ chối
                  </button>
                </div>
              </li>
            ));
        })}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
