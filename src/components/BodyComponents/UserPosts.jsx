import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const UserPosts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const ID = JSON.parse(localStorage.getItem("id"));
      const url = `http://localhost:12840/api/Discussion/GetDiscussionPostsByID`;
      const getID = {
        id: ID,
      };
      axios
        .post(url, getID, { headers: { "Content-Type": "application/json" } })
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

  return (
    <div>
      {data !== null ? (
        <div>
          <h1 className="text-center pt-3">Discussion Posts</h1>
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
                    <th>Is Approved</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>
                        {d.isApproved !== 0 ? (
                          <Link to={`/userDashboard/userDiscussions/${d.id}`}>
                            {d.title}
                          </Link>
                        ) : (
                          d.title
                        )}
                      </td>
                      <td>
                        {d.descriptions.length > 20 ? (
                          <p>{d.descriptions.substring(0, 25)}...</p>
                        ) : (
                          <p>{d.descriptions}</p>
                        )}
                      </td>
                      <td>
                        {d.isApproved !== 0 ? (
                          <p>Approved</p>
                        ) : (
                          <p>Pending Approval</p>
                        )}
                      </td>
                      <td>{d.createdDate}</td>
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
          <h1 className="text-center pt-4"> No Discussion posts found </h1>{" "}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
