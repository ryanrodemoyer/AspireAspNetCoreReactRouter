import { describe, it, expect } from "vitest";
import { renderWithRouter, screen } from "@test/test-utils";
import Home from "./home";

describe("Home", () => {
  it("renders the home page with heading", () => {
    renderWithRouter(<Home />);

    expect(
      screen.getByRole("heading", { name: /bobrossify/i })
    ).toBeInTheDocument();
  });

  it("displays the tagline", () => {
    renderWithRouter(<Home />);

    expect(
      screen.getByText(/discover masterpieces from the greatest artists/i)
    ).toBeInTheDocument();
  });

  it("has a link to view paintings", () => {
    renderWithRouter(<Home />);

    const link = screen.getByRole("link", { name: /view famous paintings/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/paintings");
  });

  it("navigates to paintings page when link is clicked", async () => {
    const { user, router } = renderWithRouter(<Home />, {
      routes: [
        { path: "/", element: <Home /> },
        {
          path: "/paintings",
          element: <div data-testid="paintings-page">Paintings Page</div>,
        },
      ],
    });

    const link = screen.getByRole("link", { name: /view famous paintings/i });
    await user.click(link);

    expect(router.state.location.pathname).toBe("/paintings");
  });
});

describe("Home meta", () => {
  it("exports meta function that returns correct metadata", async () => {
    // Import the meta function directly to test it
    const { meta } = await import("./home");

    const result = meta({} as Parameters<typeof meta>[0]);

    expect(result).toContainEqual({ title: "Bobrossify - Famous Paintings" });
    expect(result).toContainEqual({
      name: "description",
      content: "Explore famous paintings from art history",
    });
  });
});
