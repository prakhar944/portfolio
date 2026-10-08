import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import Contact from "../pages/Contact";
import { Navbar } from "../components/layout/Navbar";
import { ExternalLink } from "../components/ui/Links";

describe("Portfolio navigation and content", () => {
  it.each([
    ["/about", "The person"],
    ["/projects", "From an idea"],
    ["/education", "Building on"],
    ["/contact", "Good things start"],
    ["/not-a-route", "A small"],
  ])("loads %s with a unique heading and title", async (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
    const title = await screen.findByRole("heading", { level: 1 });
    expect(title.textContent).toContain(heading);
    expect(document.title).toContain("Prakhar Shrivastava");
  });

  it("navigates from the home project CTA to the case studies", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Prakhar",
    );
    await user.click(screen.getByRole("link", { name: "View projects" }));
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
        "From an idea",
      ),
    );
    expect(document.activeElement?.id).toBe("main-content");
  });

  it("opens the mobile menu and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeTruthy();
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(
        screen.queryByRole("navigation", { name: "Mobile navigation" }),
      ).toBeNull(),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("does not turn missing URLs into broken external links", () => {
    render(<ExternalLink href="YOUR_GITHUB_URL">GitHub</ExternalLink>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Pending")).toBeTruthy();
  });
});

describe("Contact form without an endpoint", () => {
  it("prepares a correctly encoded email and never sends a network request", async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<Contact />);
    await user.type(screen.getByLabelText("Your name"), "Test Visitor");
    await user.type(
      screen.getByLabelText("Email address"),
      "visitor@example.com",
    );
    await user.type(screen.getByLabelText("Subject"), "React & APIs?");
    await user.type(
      screen.getByLabelText("Message"),
      "A development question.",
    );
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByRole("status").textContent).toContain(
      "Nothing has been sent",
    );
    const draft = screen
      .getByRole("link", { name: "Open email app" })
      .getAttribute("href")!;
    expect(draft).toContain(
      "mailto:prakharshrivastava109@gmail.com?subject=React%20%26%20APIs%3F",
    );
    expect(decodeURIComponent(draft)).toContain(
      "Reply to: visitor@example.com",
    );
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("rejects whitespace-only messages", async () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Your name"), {
      target: { value: "   " },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: "Send message" }).closest("form")!,
    );
    expect(screen.getByRole("status").textContent).toBe(
      "Please complete every field.",
    );
    expect(screen.queryByRole("link", { name: "Open email app" })).toBeNull();
  });

  it("marks all four fields as required and uses email validation", () => {
    render(<Contact />);
    for (const label of ["Your name", "Email address", "Subject", "Message"])
      expect(screen.getByLabelText(label).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText("Email address").getAttribute("type")).toBe(
      "email",
    );
  });
});
