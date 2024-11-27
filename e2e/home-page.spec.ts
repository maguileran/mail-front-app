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
  await page.getByPlaceholder("Filter by email...").click();
  await page.getByPlaceholder("Filter by email...").fill("b");
  await expect(page.locator("td")).toContainText("No results.");
  await page.getByPlaceholder("Filter by email...").click();
  await page.getByPlaceholder("Filter by email...").fill("");
});

test("[Should] assign a tag to mail [Then] remove the tag", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("td:nth-child(3)").first().click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.locator("tr:nth-child(2) > td:nth-child(3)").click();
  await page.getByRole("button", { name: "Spam" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page
    .locator("td")
    .filter({ hasText: /^Other$/ })
    .click();
  await expect(page.locator("tbody")).toContainText("Other");
  await page.locator("tr:nth-child(2) > td:nth-child(3)").click();
  await page.getByRole("button", { name: "Spam" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.locator("tbody")).toContainText("OtherSpam");
});
