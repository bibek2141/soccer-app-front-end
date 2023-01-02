import React from "react";
import AdminHeader from "../HeaderComponents/AdminHeader";
import UserHeader from "../HeaderComponents/UserHeader";
import UserHome from "../BodyComponents/UserHome";
import UserPosts from "../BodyComponents/UserPosts";

const UserDashBoard = ({ role }) => {
  return (
    <div>
      {Number(role) === Number(1) ? <AdminHeader /> : <UserHeader />}
      <UserHome />
      <UserPosts />
    </div>
  );
};

export default UserDashBoard;
