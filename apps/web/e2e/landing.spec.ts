import { expect, test } from "@playwright/test";

test("landing renders in Georgian with the sign-in entry point", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ka");
  await expect(page.getByRole("link", { name: /შესვლა/ })).toBeVisible();
});

test("business time is shown in Asia/Tbilisi regardless of browser zone", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Asia/Tbilisi")).toBeVisible();
});
