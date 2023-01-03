import React from "react";
import UserHeader from "../HeaderComponents/UserHeader";
import AllUsersDiscussionsPosts from "../BodyComponents/AllUsersDiscussionsPosts";
import AdminHeader from "../HeaderComponents/AdminHeader";

const DiscussionsBoard = ({ role }) => {
  return (
    <div>
      {Number(role) === Number(1) ? <AdminHeader /> : <UserHeader />}
      <AllUsersDiscussionsPosts />
    </div>
  );
};

export default DiscussionsBoard;
