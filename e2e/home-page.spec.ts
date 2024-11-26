import { test, expect } from "@playwright/test";

test("[Should] load initial page with title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading")).toContainText("Welcome");
});

test("[Should] show 3 items [Then] select them [And] mark as selected", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("navigation")).toContainText(
    "0 of 3 row(s) selected."
  );
  await page.getByLabel("Select all").click();
  await expect(page.getByRole("navigation")).toContainText(
    "3 of 3 row(s) selected."
  );
});

test("[Should] filter emails with no results [Then] clear and see all items", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByPlaceholder("Filter emails...").click();
  await page.getByPlaceholder("Filter emails...").fill("b");
  await expect(page.locator("td")).toContainText("No results.");
  await page.getByPlaceholder("Filter emails...").click();
  await page.getByPlaceholder("Filter emails...").fill("");
});
