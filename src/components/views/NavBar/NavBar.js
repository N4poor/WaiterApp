import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      className="my-3 px-4 rounded"
    >
      <Navbar.Brand as={NavLink} to="/">
        Waiter.app
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;