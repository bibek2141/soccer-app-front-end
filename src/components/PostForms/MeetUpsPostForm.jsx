import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const MeetUpsPostForm = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [required, setRequired] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const filterTime = (date) => {
    const isPastTime = new Date().getTime() > date.getTime();
    return !isPastTime;
  };

  const handlePost = (e) => {
    e.preventDefault();
    var id = JSON.parse(localStorage.getItem("id"));
    const url = `http://localhost:12840/api/Meetup/CreateMeetUpPosts`;
    console.log(title, location, id, startDate);
    const data = {
      Title: title,
      Location: location,
      AddedBy: id,
      MeetUpsDateTime: startDate,
    };

    if (!title || !location) {
      setRequired(true);
      return;
    }

    try {
      axios.post(url, data, {
        headers: {
          "content-type": "text/json",
        },
      });
      setSuccess(true);
      setRequired(false);
      //window.location.reload();
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="form">
      <div className="form-body">
        {success && (
          <div
            className="alert text-center alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>
              Post is created successfully. Please check back later. Waiting on
              admin approval.{" "}
            </strong>
          </div>
        )}
        {error && (
          <div
            className="alert text-center alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Post is unable to create successfully. </strong>
          </div>
        )}
        {required && (
          <div
            className="alert text-center alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Title or location cannot be blank. </strong>
          </div>
        )}
        <div className="Title">
          <h3 className="text-center pb-2">Meet Ups</h3>
        </div>
        <div className="title pb-4">
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="location form-group">
          <input
            className="form-control"
            id="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
          ></input>
        </div>
        <div className="form-group">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            filterTime={filterTime}
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </div>
      </div>
      <div className="footer">
        <div className="px-2">
          <Button variant="success" onClick={(e) => handlePost(e)}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetUpsPostForm;
