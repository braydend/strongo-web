import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";

const Container = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginPage: React.FC = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <Container>
      {showRegistration ? <RegisterForm /> : <LoginForm />}
      <Button onClick={() => setShowRegistration((prev) => !prev)}>
        {showRegistration ? "Login" : "Register"}
      </Button>
    </Container>
  );
};

export default LoginPage;
