import React from "react";
import AdminHeader from "../HeaderComponents/AdminHeader";
import UserHeader from "../HeaderComponents/UserHeader";
import UserHome from "../BodyComponents/UserHome";
import UserPosts from "../BodyComponents/UserPosts";
import UserMeetUpsPost from "../BodyComponents/UserMeetUpsPost";

const UserDashBoard = ({ role }) => {
  return (
    <div>
      {Number(role) === Number(1) ? <AdminHeader /> : <UserHeader />}
      <UserHome />
      <UserPosts />
      <UserMeetUpsPost />
    </div>
  );
};

export default UserDashBoard;
