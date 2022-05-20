import React from "react";
import { screen, render, fireEvent } from "test-utils";
import Navbar from "..";

beforeEach(() => {
    render(<Navbar />);
});

describe("Navbar component", () => {
    it("Сomponent should be rendered", () => {
        //FIXME: fix render test
        const text = screen.getByRole("heading");
        expect(text).toBeInTheDocument();
    });
    it("should render auth button", () => {
        const loginButton = screen.getByRole("button", { name: /login/i });
        expect(loginButton).toBeInTheDocument();
    });
    it("should render Avatar and logout button after click to Login button", () => {
        const button = screen.getByRole("button", { name: /login/i });

        expect(button).toBeInTheDocument();
        expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();

        fireEvent.click(button);

        expect(
            screen.getByRole("button", { name: /avatar/i })
        ).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /avatar/i }));

        expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
    });
});
