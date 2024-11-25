import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/Login";
import Home from "../Pages/Home";
import App from "../App";
import SignUp from "../Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);

export default router;
