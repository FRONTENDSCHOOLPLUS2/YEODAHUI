import { createBrowserRouter } from "react-router-dom";

import Error from "@pages/Error";
import Layout from "@components/layout";
import Community from "@pages/community";
import List from "@pages/community/List";
import Detail from "@pages/community/Detail";
import CommentList from "@pages/community/CommentList";
import New from "@pages/community/New";
import Edit from "@pages/community/Edit";
import Login from "@pages/user/Login";
import Signup from "@pages/user/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Community />,
      },
      {
        path: ":type",
        element: <List />,
      },
      {
        path: ":type/:_id",
        element: <Detail />,
        children: [
          {
            index: true,
            element: <CommentList />,
          },
        ],
      },
      {
        path: ":type/new",
        element: <New />,
      },
      {
        path: ":type/:_id/edit",
        element: <Edit />,
      },
      {
        path: "user/login",
        element: <Login />,
      },
      {
        path: "user/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
