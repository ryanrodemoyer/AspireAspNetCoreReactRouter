import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("has correct title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Bobrossify/);
  });

  test("displays the main heading", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /bobrossify/i })).toBeVisible();
  });

  test("displays the tagline", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText(/discover masterpieces from the greatest artists/i)
    ).toBeVisible();
  });

  test("navigates to paintings page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /view famous paintings/i }).click();

    await expect(page).toHaveURL(/.*paintings/);
  });
});

test.describe("Navigation", () => {
  test("404 page displays for unknown routes", async ({ page }) => {
    await page.goto("/unknown-route-that-does-not-exist");

    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText(/could not be found/i)).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("home page has no major accessibility issues", async ({ page }) => {
    await page.goto("/");

    // Check that the page has a main landmark
    await expect(page.locator("main")).toBeVisible();

    // Check that links have accessible names
    const links = page.getByRole("link");
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const accessibleName = await link.getAttribute("aria-label") ??
        await link.textContent();
      expect(accessibleName?.trim()).toBeTruthy();
    }
  });
});

test.describe("Responsive Design", () => {
  test("renders correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /bobrossify/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /view famous paintings/i })
    ).toBeVisible();
  });

  test("renders correctly on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /bobrossify/i })).toBeVisible();
  });

  test("renders correctly on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /bobrossify/i })).toBeVisible();
  });
});
