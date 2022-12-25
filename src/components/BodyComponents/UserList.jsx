import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const UserList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = `http://localhost:12840/api/UserRegistration/Userlist`;
    axios
      .post(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        const dt = response.data;
        setData(dt.listUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprove = async (e, i) => {
    const url = `http://localhost:12840/api/UserRegistration/Approve`;
    const data = {
      ID: i,
    };
    await axios.post(url, data);
    window.location.reload();
  };

  const handleDeleteUser = async (e, i) => {
    const url = `http://localhost:12840/api/UserRegistration/Delete`;
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
          <h1 className="text-center pt-3 text-white">List of Users</h1>
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
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Is Approved</th>
                    <th>Role</th>
                    <th>Delete User</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.phoneNo}</td>
                      <td>
                        {d.isApproved === 0 ? (
                          <Button
                            variant="primary"
                            onClick={(e) => handleApprove(e, d.id)}
                          >
                            Approve
                          </Button>
                        ) : (
                          <p>Approved</p>
                        )}
                      </td>
                      <td>{d.role === 2 ? <p>User</p> : <p>Admin</p>}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => handleDeleteUser(e, d.id)}
                        >
                          Remove User
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ul>
          </div>
        </div>
      ) : (
        <h1 className="text-center pt-4 pb-4 text-white">No Users Found</h1>
      )}
    </div>
  );
};

export default UserList;
