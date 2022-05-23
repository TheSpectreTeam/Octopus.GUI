import React from "react";
import { render, screen } from "test-utils";
import NavMenu, { NavItem, NavItems } from "..";
import { ROUTES } from "../../../routes";

describe("NavMenu component", () => {
    it("Component should be rendared", () => {
        render(<NavMenu />);

        const NavMenuComponent = screen.getByRole("group");

        expect(NavMenuComponent).toBeInTheDocument();
    });
    it("should be rendered with NavItems", () => {
        render(<NavItems items={ROUTES} NavComponent={NavItem} />);

        expect(screen.getAllByRole("link")).toHaveLength(
            Object.keys(ROUTES).length
        );
    });
});
