import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("dev.habiburnobel@gmail.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});

//Team status change
test("status", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest testingPlaywright 1 - Use setting",
    })
    .getByRole("switch", { name: "Use setting" })
    .click();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: " Successfully Updated The Status" })
  ).toHaveText("Successfully Updated The Status");
});
