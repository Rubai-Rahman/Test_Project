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

/* test("Check Saved Smart Folder", async ({ page }) => {
  // await page.pause();
  await page.getByRole("img", { name: "Fluent" }).click();
  await page.getByRole("button", { name: "Smart Folder" }).click();
  await page.getByRole("button", { name: "playwright smart folder test" }).click();
  await page.locator("div").filter({ hasText: "Ticketing" }).locator("path").click();
  await page.locator("#headlessui-dialog-panel-:r2o: > div > div:nth-child(1) > div.flex.justify-between.items-center.px-3 > svg > path").click();
}); */
