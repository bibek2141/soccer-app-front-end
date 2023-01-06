import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const UserMeetUpsPost = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const ID = JSON.parse(localStorage.getItem("id"));
      const url = `http://localhost:12840/api/MeetUp/GetMeetUpsPostByID`;
      const getID = {
        id: ID,
      };
      axios
        .post(url, getID, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          const dt = response.data;
          setData(dt.listUserMeetUpPosts);
          console.log(dt.listUserMeetUpPosts);
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
                    <th>Location</th>
                    <th>Is Approved</th>
                    <th>Created Date</th>
                    <th>Meet Ups Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.title}</td>
                      <td>
                        {d.location.length > 20 ? (
                          <p>{d.location.substring(0, 25)}...</p>
                        ) : (
                          <p>{d.location}</p>
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
                      <td>{d.meetUpsDateTime}</td>
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
          <h1 className="text-center pt-4"> No Meet Up posts found </h1>{" "}
        </div>
      )}
    </div>
  );
};

export default UserMeetUpsPost;
