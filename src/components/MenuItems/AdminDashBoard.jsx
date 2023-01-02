import React from "react";
import AdminHeader from "../HeaderComponents/AdminHeader";
import UserList from "../BodyComponents/UserList";
import AllUsersDiscussionsPosts from "../BodyComponents/AllUsersDiscussionsPosts";
import { Link } from "react-router-dom";

const AdminDashBoard = ({ role }) => {
  if (Number(role) === Number(1)) {
    return (
      <div>
        <AdminHeader />
        <UserList />
        <AllUsersDiscussionsPosts />
      </div>
    );
  }
  return (
    <h2 className="text-center">
      <Link
        to="/userDashBoard"
        style={{ textDecoration: "none", color: "white" }}
      >
        Return Home
      </Link>{" "}
      Protected: authenticated user required
    </h2>
  );
};

export default AdminDashBoard;
