import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import "./index.css";

const MainPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    // element: <StudentDashboard />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
