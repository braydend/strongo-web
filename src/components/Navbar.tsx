import React, { useContext } from "react";
import { Button, Nav, Navbar as BSNavbar, Spinner } from "react-bootstrap";
import UserContext from "./Context/UserContext";
import firebase from "../utils/firebase";

const Navbar: React.FC = () => {
  const { user, isBusy, setBusy } = useContext(UserContext);

  const handleLogout = async () => {
    setBusy(true);
    await firebase.logout();
    setBusy(false);
  };

  return (
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand href="#home" className="mr-auto">
        Strongo
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        <BSNavbar.Text className="mr-sm-2">
          Signed in as: {user?.displayName}
        </BSNavbar.Text>
        <Button
          variant="outline-danger"
          className="mr-sm-2"
          onClick={handleLogout}
        >
          Logout
        </Button>
        {isBusy && <Spinner variant="danger" animation="border" />}
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
