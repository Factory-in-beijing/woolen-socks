import { expect, test } from "@playwright/test";

test("landing renders in English with the sign-in entry point", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
});

test("business time is shown in Asia/Tbilisi regardless of browser zone", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Asia/Tbilisi")).toBeVisible();
});
