import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import AdminLayout from "./layouts/Admin.js";
import Register from "./auth/register";
import Login from "./auth/login";
import { Routes } from "react-router-dom";
import axios from "axios";
const endPointUserCheck = "https://localhost:7112/api/Auth/user";

const App = () => {
  const [loginOnay, setLoginOnay] = useState(false);

  const getUser = () => {
    axios
      .get(endPointUserCheck, { withCredentials: "include" })
      .then((res) => {

        if (res.data) {
          console.log(res);

          setLoginOnay(true)
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (loginOnay === false) {
      console.log(loginOnay);
    }
    getUser();
  }, [loginOnay]);

  return (
    <div className="App">
      <BrowserRouter>
        <main className="form-signin">
          <Routes>
            <Route path="/*" element={loginOnay === true ? <AdminLayout /> : <Login />} />
            <Route path="/admin/*" element={loginOnay === true ? <AdminLayout /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
