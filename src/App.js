import Login from "./components/Login";
import LoginUser from "./components/LoginUser";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/Dashboard";
import React from "react";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./firebase/firebaseStorage/testfile";

const code = new URLSearchParams(window.location.search).get("code");

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: code ? <Dashboard code={code} /> : <Login />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
]);

function App() {
  //console.log(process.env)
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  //return <Dashboard />;
}

export default App;
