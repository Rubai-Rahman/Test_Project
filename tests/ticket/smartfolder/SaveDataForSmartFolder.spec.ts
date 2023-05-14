import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://social-engagement-new-design.up.railway.app/auth/login");
  await page.locator('//*[@id="__next"]/div[1]/div/section[1]/div/div/div[2]/div[2]/button').click();
  await page.locator("#identifierId").fill("dev.habiburnobel@gmail.com");
  await page.locator("#identifierNext > div > button").click();
  await page.locator("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input").fill("habiburnobel7761");
  await page.locator("#passwordNext > div > button").click();
  await page.getByRole("link", { name: "Ticketing" }).click();
  await page.goto("https://social-engagement-new-design.up.railway.app/tickets");
});

test.afterEach(async ({ page }) => {
  await page.getByRole("button", { name: "Open user menu N" }).click();
  await page.getByText("Sign out").click();
  await expect(page.getByText("Welcome back to Dewan! Your customers are waiting. Login to start engaging with them.")).toHaveText(
    "Welcome back to Dewan! Your customers are waiting. Login to start engaging with them."
  );
});

test("Check Smart Folder Functionality", async ({ page }) => {
  await page.locator(".mr-4 > .text-grayCustom").click();
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("Subject", { exact: true }).click();
  await page.locator(".css-13cymwt-control > .css-hlgwow > .css-19bb58m").click();
  await page.locator("#react-select-3-option-0").click();
  await page.getByPlaceholder("Write text...").click();
  await page.getByPlaceholder("Write text...").fill("test by adnan.");
  await page.getByRole("button", { name: "Apply Filter" }).click();
  await page.getByText("test by adnan.").click();
  await page.getByRole("button", { name: "Save as Smart Folder" }).click();
  await page.getByPlaceholder("Enter a name for this filter").fill("playwright smart folder test");
  await page.getByRole("button", { name: "Save Filter" }).click();
  await expect(page.getByText("filter saved")).toHaveText("filter saved");
});
