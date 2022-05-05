import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";

import Navbar from "..";

describe("Navbar component", () => {
  it("Сomponent should be rendered", () => {
    render(<Navbar />);
    const text = screen.getByRole("heading");
    expect(text).toBeInTheDocument();
  });
  it("should render auth button", () => {
    render(<Navbar />);
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });
  it("should render Logout button after click to Login button", () => {
    render(<Navbar />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);

    fireEvent.click(button);

    expect(button).toHaveTextContent(/logout/i);
  });
});
