import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../Navbar';

const Layout: React.FC = ({ children }) => {


    return (
        <Container>
            <Navbar />
            {children}
        </Container>
    );
};

export default Layout;