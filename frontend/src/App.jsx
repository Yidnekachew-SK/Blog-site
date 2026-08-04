import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from './userpage/login-page';
import SignUp from './userpage/signup-page';
import Homepage from './userpage/homepage';
import PostDetail from "./userpage/post-page";

function App() {
  const ContextProvider = function() {
    const [user, setUser] = useState(null);
    const hasToken = !!localStorage.getItem("token");

    const isLoggedIn = !!user && hasToken;

    return <Outlet context={{ user, setUser, isLoggedIn }} />
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ContextProvider />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "post-detail/:id", element: <PostDetail /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
