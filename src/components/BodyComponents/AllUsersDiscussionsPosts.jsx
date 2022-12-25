import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllUsersDiscussionsPosts = () => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const getData = () => {
      setRole(JSON.parse(localStorage.getItem("role")));
      const roleID = JSON.parse(localStorage.getItem("role"));
      const url = `http://localhost:12840/api/Discussion/ListDiscussionPosts`;

      const getRole = {
        Role: roleID,
      };

      axios
        .post(url, getRole, {
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
    getData();
  }, []);
  const handleApproveUserPost = async (e, i) => {
    const url = `http://localhost:12840/api/Discussion/ApproveDiscussionPosts`;
    const data = {
      ID: i,
    };
    await axios.post(url, data);
    window.location.reload();
  };
  const handleDeletePost = async (e, i) => {
    const url = `http://localhost:12840/api/Discussion/DeleteDiscussionPost`;
    const data = {
      ID: i,
    };
    await axios.post(url, data);
    window.location.reload();
  };
  return (
    <div>
      {data.length > 0 ? (
        <div>
          <h1 className="text-center pt-3 text-white">Discussion Posts</h1>
          <div className="container pt-3">
            <ul>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="text-center"
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    {role === 1 ? <th>Is Approved</th> : ""}
                    <th>Created Date</th>
                    {role === 1 ? <th>Delete Posts</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/userDashboard/userDiscussions/${d.id}`}>
                          {d.title}
                        </Link>
                      </td>
                      <td>
                        {d.descriptions.length > 20 ? (
                          <p>{d.descriptions.substring(0, 25)}...</p>
                        ) : (
                          <p>{d.descriptions}</p>
                        )}
                      </td>
                      {role === 1 ? (
                        d.isApproved !== 0 ? (
                          <td>
                            <p>Approved</p>
                          </td>
                        ) : (
                          <td>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={(e) => handleApproveUserPost(e, d.id)}
                            >
                              Approve Post
                            </Button>
                          </td>
                        )
                      ) : (
                        ""
                      )}

                      <td>{d.createdDate}</td>
                      {role === 1 ? (
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => handleDeletePost(e, d.id)}
                          >
                            Remove Post
                          </Button>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <h1 className="text-center pt-4 text-white">
            {" "}
            No Discussion posts found{" "}
          </h1>{" "}
        </div>
      )}
    </div>
  );
};

export default AllUsersDiscussionsPosts;
