import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import firebase from "../../../utils/firebase";
import { useFormValidation } from "../../../hooks/useFormValidation";
import styled from "styled-components";
import validateRegistration from "../../../utils/validators/validateRegistration";

type FormType = {
  name: string;
  email: string;
  password: string;
};

const INITIAL_STATE: FormType = {
  name: "",
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

const RegisterForm = () => {
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const authenticateUser = async () => {
    setBusy(true);
    setError(undefined);
    const { email, password, name } = values;

    try {
      await firebase.register(name, email, password);
    } catch (e) {
      console.error("Authentication error", e);
      setError(e.message);
    }
    setBusy(false);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    errors,
  } = useFormValidation<FormType>(
    INITIAL_STATE,
    validateRegistration,
    authenticateUser
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const hasErrors = Object.keys(errors).length > 0 || error;

  return (
    <FormContainer>
      {hasErrors && (
        <Alert variant="danger">
          {[...Object.values(errors), error].join(" ")}
        </Alert>
      )}
      <Form onKeyPress={handleKeyPress}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Gary Oak"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="enter@your.email"
            value={values.email}
            onChange={handleChange}
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
          Sign up!
        </Button>
        {busy && <Spinner variant="info" animation="border" />}
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
