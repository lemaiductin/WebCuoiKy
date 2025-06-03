import React from "react";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
