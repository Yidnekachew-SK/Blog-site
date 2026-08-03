import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from './userpage/login-page';
import SignUp from './userpage/signup-page';
import Homepage from './userpage/homepage';

const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
