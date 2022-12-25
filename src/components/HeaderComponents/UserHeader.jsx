import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Soccer Social Web App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/userDashboard">Home</Nav.Link>
            <Nav.Link href="/userDashboard/Discussions">Discussions</Nav.Link>
            <Nav.Link href="/userDashboard/meetUps">Meet Ups</Nav.Link>
            <Nav.Link href="/userDashboard/memes">Memes</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="px-4">Signed in as: {userName}</Navbar.Text>
            <Button variant="danger" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserHeader;
