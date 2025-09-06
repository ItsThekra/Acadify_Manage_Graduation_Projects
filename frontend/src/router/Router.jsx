import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router";

// Components
import Navbar from "../components/Navbar_component";
import Footer from "../components/Footer_component";

// Pages
import Login from "../pages/Login_page";
import Register from "../pages/Register_page";
import AdminDashboard from "../pages/AdminDashboard_page";
import StudentDashboard from "../pages/StudentDashboard_page";
import TeacherDashboard from "../pages/TeacherDashboard_page";
import Welcome_page from "../pages/Welcome_page";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

// Protection based on role
function ProtectedRoute({ element, role })
{
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/" />;
  if (user.role !== role) return <Navigate to= {`/${user.role}`} />;
  return element;
}

// build router system
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Welcome_page /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="admin" element={<AdminDashboard />} />
        ),
      },
      {
        path: "/student",
        element: (
          <ProtectedRoute role="student" element={<StudentDashboard />} />
        ),
      },
      {
        path: "/teacher",
        element: (
          <ProtectedRoute role="teacher" element={<TeacherDashboard />} />
        ),
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
