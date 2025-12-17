import { describe, it, expect } from "vitest";
import { render, screen } from "@test/test-utils";
import { Welcome } from "./welcome";

describe("Welcome", () => {
  it("renders the welcome component", () => {
    render(<Welcome />);

    expect(screen.getByText("What's next?")).toBeInTheDocument();
  });

  it("displays documentation link", () => {
    render(<Welcome />);

    const docsLink = screen.getByRole("link", { name: /react router docs/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("href", "https://reactrouter.com/docs");
  });

  it("displays discord link", () => {
    render(<Welcome />);

    const discordLink = screen.getByRole("link", { name: /join discord/i });
    expect(discordLink).toBeInTheDocument();
    expect(discordLink).toHaveAttribute("href", "https://rmx.as/discord");
  });

  it("opens links in new tab", () => {
    render(<Welcome />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  it("renders logo images with correct alt text", () => {
    render(<Welcome />);

    const logos = screen.getAllByAltText("React Router");
    expect(logos).toHaveLength(2); // Light and dark versions
  });
});
