import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import firebase from "../../../utils/firebase";
import { useFormValidation } from "../../../hooks/useFormValidation";
import validateLogin from "../../../utils/validators/validateLogin";
import styled from "styled-components";

type FormType = {
  email: string;
  password: string;
};

const INITIAL_STATE: FormType = {
  email: "",
  password: "",
};

const FormContainer = styled.div`
  background: gray;
  padding: 1em 2em;
  border-radius: 4px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (min-width: 600px) and (max-width: 1200px) {
    width: 60%;
  }
  width: 40%;
`;

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const authenticateUser = async () => {
    setBusy(true);
    setError(undefined);
    const { email, password } = values;

    try {
      await firebase.login(email, password);
    } catch (e) {
      console.error("Authentication error", e);
      setError(e.message);
    }
    setBusy(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    errors,
  } = useFormValidation<FormType>(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );

  const hasErrors = Object.keys(errors).length > 0 || error;

  return (
    <FormContainer>
      {hasErrors && (
        <Alert variant="danger">
          {[...Object.values(errors), error].join(" ")}
        </Alert>
      )}
      <Form>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="enter@your.email"
            value={values.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Secret sauce"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          Login!
        </Button>
        {busy && <Spinner variant="info" animation="border" />}
      </Form>
    </FormContainer>
  );
};

export default LoginForm;
