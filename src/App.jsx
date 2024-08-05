import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import EditPostPage from "./routes/editPostPage/editPostPage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import AdminDashboard from "./routes/adminDashboard/AdminDashboard";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Testimonials from "./routes/Testimonials/Testimonials";
import AddTestimonial from "./routes/AddTestimonial/AddTestimonial";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword"; // Import the ForgotPassword component
import ResetPassword from "./routes/ForgotPassword/ResetPassword"; // Import the ResetPassword component
import MortgageCalculator from "./components/MortgageCalculator/MortgageCalculator";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/testimonials",
          element: <Testimonials />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
        },
        {
          path: "/calculate-mortgage",
          element: <MortgageCalculator />,
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/edit/:id",
          element: <EditPostPage />,
        },
        {
          path: "/add-testimonial",
          element: <AddTestimonial />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute username="admin">
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
