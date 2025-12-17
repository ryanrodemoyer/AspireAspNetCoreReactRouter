import { describe, it, expect, vi } from "vitest";
import { renderWithRouter, screen } from "@test/test-utils";
import { Header } from "../Header";

// Mock the navigation config
vi.mock("../navigation.config", () => ({
  mainNavItems: [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "About", to: "/about" },
  ],
}));

describe("Header", () => {
  it("renders the logo", () => {
    renderWithRouter(<Header />);

    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("renders login and signup buttons", () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("opens mobile menu when button is clicked", async () => {
    const { user } = renderWithRouter(<Header />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuButton);

    // Mobile menu should be visible
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("closes mobile menu when close button is clicked", async () => {
    const { user } = renderWithRouter(<Header />);

    // Open the menu
    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);

    // Close the menu
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton);

    // Menu should be closed
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("logo links to home page", () => {
    renderWithRouter(<Header />);

    const logoLink = screen.getByRole("link", { name: "Logo" });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
