import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminHeader from "../HeaderComponents/AdminHeader";
import UserHeader from "../HeaderComponents/UserHeader";
import axios from "axios";
import DiscussionPagePost from "./DiscussionPagePost";
import PageComments from "./PageComments";

const DiscussionPost = () => {
  const [data, setData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const role = JSON.parse(localStorage.getItem("role"));
  const PostID = useParams();
  const userID = JSON.parse(localStorage.getItem("id"));
  const ID = JSON.parse(PostID.discussionID);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = () => {
      const url = `http://localhost:12840/api/Discussion/GetDiscussionPostByID`;
      const getDiscussionID = {
        ID: ID,
      };

      axios
        .post(url, getDiscussionID, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          const dt = response.data;
          setData(dt.listUserDiscussionPosts);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCommentsData = () => {
      const url = `http://localhost:12840/api/Comments/CommentsListByID`;
      const getPostID = {
        PostID: ID,
      };

      axios
        .post(url, getPostID, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          const dt = response.data;
          setCommentsData(dt.listComments);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCommentsData(ID);
    getData(ID);
  }, [ID]);

  //Comments
  const handleComments = async (e) => {
    e.preventDefault();
    const url = `http://localhost:12840/api/Comments/DiscussionPostsComment`;
    const data = {
      CommentsUserID: userID,
      Comment: comment,
      PostID: ID,
    };

    if (data.Comments === "") {
      setError(true);
    } else {
      await axios.post(url, data);
      window.location.reload();
    }
  };

  return (
    <div>
      <div>{role === 1 ? <AdminHeader /> : <UserHeader />}</div>
      {data !== null ? (
        <div className=" bg-black text-white pt-5 pb-5">
          <div className="container">
            {error && (
              <div
                className="alert text-center alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>
                  Please fill comment input box before submitting.{" "}
                </strong>
              </div>
            )}

            <DiscussionPagePost data={data} />
            <PageComments data={commentsData} />

            <form>
              <div className="form-group pb-4">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Comments"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleComments(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h1 className="text-white text-center pt-5">
          Discussion Page does not exists. Please try different URL.
        </h1>
      )}
    </div>
  );
};

export default DiscussionPost;
