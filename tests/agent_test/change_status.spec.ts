import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("rubairahman1@gmail.com", "password");
  await expect(page).toHaveURL("https://dewan.up.railway.app/dashboard");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});

//change the status of an agent
test("Change the status of an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest",
    })
    .getByRole("switch", { name: "Use setting" })
    .click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Status changed successfully" })
  ).toHaveText("Status changed successfully");
});
