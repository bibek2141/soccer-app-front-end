import React from "react";
import UserHeader from "../HeaderComponents/UserHeader";
import AllUsersDiscussionsPosts from "../BodyComponents/AllUsersDiscussionsPosts";

const DiscussionsBoard = () => {
  return (
    <div>
      <UserHeader />
      <AllUsersDiscussionsPosts />
    </div>
  );
};

export default DiscussionsBoard;
