import React from "react";
import { render, screen } from "test-utils";
import NavMenu, { NavItem, NavItems } from "..";
import { NAV_ITEMS } from "../../../common/navItems";

describe("NavMenu component", () => {
    it("Component should be rendared", () => {
        render(<NavMenu />);

        const NavMenuComponent = screen.getByRole("group");

        expect(NavMenuComponent).toBeInTheDocument();
    });
    it("should be rendered with NavItems", () => {
        render(<NavItems items={NAV_ITEMS} NavComponent={NavItem} />);

        expect(screen.getAllByRole("link")).toHaveLength(NAV_ITEMS.length);
    });
});
