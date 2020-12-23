import React, { useContext } from "react";
import { Button, Navbar as BSNavbar, Spinner } from "react-bootstrap";
import styled from "styled-components";
import UserContext from "./Context/UserContext";

const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navbar: React.FC = () => {
  const { logout, user, isBusy } = useContext(UserContext);

  return (
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand href="#home" className="mr-auto">
        Strongo
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <UserSection>
          <BSNavbar.Text className="mr-sm-2">
            Signed in as: {user?.displayName}
          </BSNavbar.Text>
          <Button variant="outline-danger" className="mr-sm-2" onClick={logout}>
            Logout
          </Button>
        </UserSection>
        {isBusy && <Spinner animation="border" />}
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
