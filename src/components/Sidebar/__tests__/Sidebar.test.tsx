import React from "react";
import { render, screen } from "test-utils";
import Sidebar from "..";
import NavMenu from "../../NavMenu";
describe("Sidebar component", () => {
    it("Сomponent should be rendered", () => {
        render(
            <Sidebar>
                <></>
            </Sidebar>
        );
        const SidebarComponent = screen.getByRole("complementary");

        expect(SidebarComponent).toBeInTheDocument();
    });
    it("should render with NavMenu", () => {
        render(
            <Sidebar>
                <NavMenu />
            </Sidebar>
        );
        const SidebarComponent = screen.getByRole("complementary");
        const NavMenuComponent = screen.getByRole("navigation");

        expect(SidebarComponent).toContainElement(NavMenuComponent);
    });
});
