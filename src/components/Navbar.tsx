import React, { useContext } from 'react';
import { Button, Nav, Navbar as BSNavbar, Spinner } from 'react-bootstrap';
import UserContext from '../utils/UserContext';
import firebase from '../utils/firebase';

enum Modal {
    Login,
    Register,
};

const Navbar: React.FC = () => {
    const { user, isBusy, showModal, setBusy } = useContext(UserContext);

    const handleLogout = async () => {
        setBusy(true);
        await firebase.logout();
        setBusy (false);
    };

    return (
        <BSNavbar bg="light" expand="lg">
            <BSNavbar.Brand href="#home" className='mr-auto'>Strongo</BSNavbar.Brand>
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" />
            { user ? (
                <>
                    <BSNavbar.Text className='mr-sm-2'>Signed in as: {user.displayName}</BSNavbar.Text>
                    <Button variant="outline-danger" className="mr-sm-2" disabled={isBusy} onClick={handleLogout}>Logout</Button>
                    {isBusy && <Spinner variant='danger' animation='border' />}
                </>
            ) : (
                <>
                    <Button variant="outline-warning" className="mr-sm-2" onClick={() => showModal(Modal.Register)}>Register</Button>
                    <Button variant="outline-success" className="mr-sm-2" onClick={() => showModal(Modal.Login)}>Login</Button>
                </>
            )}
            </BSNavbar.Collapse>
        </BSNavbar>
    );
};

export default Navbar;