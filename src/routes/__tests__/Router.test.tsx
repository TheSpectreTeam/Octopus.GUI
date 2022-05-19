import React from "react";
import {render,screen} from 'test-utils'
import { MemoryRouter } from "react-router-dom";
import Routing from "..";

describe("Routing component", () => {
    it("should be navigate to Administration page", async () => {
        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <Routing />
            </MemoryRouter>
        );
        expect(screen.getByRole("progressbar")).toBeInTheDocument();

        const LazyPage = await screen.findByTestId(/administration-page/i);

        expect(LazyPage).toBeInTheDocument();
    });
    it("should be navigate NotFound page", async () => {
        render(
            <MemoryRouter initialEntries={["/asdasd"]}>
                <Routing />
            </MemoryRouter>
        );
        const LazyPage = await screen.findByText(/page not found/i);

        expect(LazyPage).toBeInTheDocument();
    });
});
