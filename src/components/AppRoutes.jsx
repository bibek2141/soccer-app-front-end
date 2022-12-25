import React from "react";
import Header from "./Header";
import Registration from "./Registration";
import Login from "./Login";
import UserHeader from "./HeaderComponents/UserHeader";
import AdminHeader from "./HeaderComponents/AdminHeader";
import UserList from "./BodyComponents/UserList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../Services/ProtectedRoutes";
import UserHome from "./BodyComponents/UserHome";
import UserPosts from "./BodyComponents/UserPosts";
import AllUsersDiscussionsPosts from "./BodyComponents/AllUsersDiscussionsPosts";

import DiscussionPost from "./BodyComponents/DiscussionPost";

let role = localStorage.getItem("role");

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <div>
              <Header />
              <Registration />
            </div>
          }
        />
        <Route
          path="/"
          exact
          element={
            <div>
              <Header />
              <Login />
            </div>
          }
        />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path="/userDashBoard"
            exact
            element={
              <div>
                <UserHeader />
                <UserHome />
                <UserPosts />
              </div>
            }
          />
          <Route
            path="/adminDashBoard"
            exact
            element={
              <div>
                <AdminHeader />
                <UserList />
                <AllUsersDiscussionsPosts />
              </div>
            }
          />
          <Route
            path="/userDashBoard/Discussions"
            exact
            element={
              <div>
                <UserHeader />
                <AllUsersDiscussionsPosts />
              </div>
            }
          />
        </Route>
        <Route
          exact
          path="/userDashBoard/userDiscussions/:discussionID"
          element=<DiscussionPost />
        ></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
