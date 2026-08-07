import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from './userpage/login-page';
import SignUp from './userpage/signup-page';
import Homepage from './userpage/homepage';
import PostDetail from "./userpage/post-page";
import AdminPostDetail from "./adminPage/post";
import Dashboard from "./adminPage/admin dashboard";
import CreateBlog from "./adminPage/create blog";

function App() {
  const api = import.meta.env.VITE_API_URL;

  const ContextProvider = function() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        (async () => {
          try {
            const response = await fetch(`${api}/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              const data = await response.json();
              setUser(data.user);
            }
          } catch (err) {
            console.error("Failed to restore user", err);
          }
        })();
      }
    }, []);
    
    const hasToken = !!localStorage.getItem("token");
    const isLoggedIn = !!user;

    return <Outlet context={{ user, setUser, isLoggedIn, api }} />
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
    {
      path: "/admin",
      element: <ContextProvider />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "post/:id", element: <AdminPostDetail /> },
        { path: "create/post", element: <CreateBlog /> }
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
