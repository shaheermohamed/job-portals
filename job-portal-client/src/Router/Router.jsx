import { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Login/Signup";
import AuthLayout from "../components/AuthLayout.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const ConditionalLogin = () => {
  const { user } = useContext(AuthContext);
  return user?.loggedIn ? <Navigate to="/" /> : <Login />;
};

// ConditionalSignup component
const ConditionalSignup = () => {
  const { user } = useContext(AuthContext);
  return user?.loggedIn ? <Navigate to="/" /> : <Signup />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <CreateJob />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <ConditionalLogin />,
      },
      {
        path: "signup",
        element: <ConditionalSignup />,
      },
    ],
  },
]);

export default router;
