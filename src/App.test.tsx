import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login page if no user defined in context", () => {
  render(<App />);

  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
});
