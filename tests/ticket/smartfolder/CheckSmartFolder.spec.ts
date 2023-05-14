import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../../pages/login";
import { LogOutPage } from "../../../pages/logout";
//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("dev.habiburnobel@gmail.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
  await page.getByRole("link", { name: "Ticketing" }).click();
  await page.getByRole("tab", { name: "history 7" }).click();
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//logout

test("Check Saved Smart Folder", async ({ page }) => {
  await page.getByRole("img", { name: "Fluent" }).click();
  await page.getByRole("button", { name: "Smart Folder" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Ticketing$/ })
    .getByRole("img")
    .click();
});
