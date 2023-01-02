import React from "react";
import RegistrationBoard from "./MenuItems/RegistrationBoard";
import LoginBoard from "./MenuItems/LoginBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../Services/ProtectedRoutes";
import DiscussionPost from "./MenuItems/DiscussionPost";
import AdminDashBoard from "./MenuItems/AdminDashBoard";
import UserDashBoard from "./MenuItems/UserDashBoard";
import DiscussionsBoard from "./MenuItems/DiscussionsBoard";

const role = localStorage.getItem("role");

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationBoard />} />
        <Route path="/" exact element={<LoginBoard />} />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path="/userDashBoard"
            exact
            element={<UserDashBoard role={role} />}
          />
          <Route
            path="/adminDashBoard"
            exact
            element={<AdminDashBoard role={role} />}
          />
          <Route
            path="/userDashBoard/Discussions"
            exact
            element={<DiscussionsBoard />}
          />
          <Route
            exact
            path="/userDashBoard/userDiscussions/:discussionID"
            element=<DiscussionPost />
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
