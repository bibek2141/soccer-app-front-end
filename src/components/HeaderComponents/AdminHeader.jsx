import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Soccer Social Web App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end px-4">
          <Navbar.Text>Signed in as: {username}</Navbar.Text>
        </Navbar.Collapse>
        <Button variant="danger" size="sm" onClick={logout}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
