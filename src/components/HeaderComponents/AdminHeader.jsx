import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
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
        <Navbar.Brand>Soccer Social Web App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="text-white">
          <Nav className="me-auto">
            <Nav.Link href="/adminDashboard">Home</Nav.Link>
            <Nav.Link href="/userDashboard/Discussions">Discussions</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="px-4">Signed in as: {username}</Navbar.Text>
            <Button variant="danger" size="sm" onClick={logout}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
