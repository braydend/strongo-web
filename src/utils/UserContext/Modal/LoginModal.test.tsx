import { render, screen } from "@testing-library/react";
import React from "react";
import LoginModal from "./LoginModal";

describe("<LoginModal />", () => {
  test("renders correctly", () => {
    render(<LoginModal show={true} onClose={jest.fn()} />);

    expect(screen.getByLabelText("Email")).toBeTruthy();
    expect(screen.getByLabelText("Password")).toBeTruthy();
    expect(screen.getByText("Login!")).toBeTruthy();
  });
});
