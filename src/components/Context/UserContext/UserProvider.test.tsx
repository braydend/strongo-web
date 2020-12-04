import React from "react";
import { UserProvider } from ".";
import { render, screen } from "@testing-library/react";

describe("<UserProvider />", () => {
  test("renders without error", () => {
    render(<UserProvider />);

    expect(screen.queryByLabelText("Email")).toBeFalsy();
  });
});
