import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DiscussionPostForm from "../PostForms/DiscussionPostForm";
import MeetUpsPostForm from "../PostForms/MeetUpsPostForm";

const UserHome = () => {
  return (
    <div className="container pt-5">
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
        className="bg-white"
      >
        <Tab eventKey={1} title="Discussions" className="bg-white">
          <DiscussionPostForm />
        </Tab>
        <Tab eventKey={2} title="Meet Ups" className="bg-white">
          <MeetUpsPostForm />
        </Tab>
        <Tab eventKey={3} title="Memes" className="bg-white">
          Tab 3 content
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserHome;
