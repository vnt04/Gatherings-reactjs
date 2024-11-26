import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/Login";
import Home from "../Pages/Home";
import App from "../App";
import SignUp from "../Pages/SignUp";
import PublicRoute from "../layouts/publicRoute";
import PrivateRoute from "../layouts/privateRoute";
import Channels from "../Pages/Channels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "sign-up", element: <SignUp /> },
        ],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [{ path: "channels", element: <Channels /> }],
  },
]);

export default router;
