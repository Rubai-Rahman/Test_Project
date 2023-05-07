import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";
;

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

//edit Team
test("editTeam", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest testing Playwright 3 - Use setting",
    })
    .getByRole("button")
    .first()
    .click();
  await page.locator('button[name="\\32 49"]').click();
  await page.getByRole("button", { name: "Update Team" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Team successfully updated " })
  ).toHaveText("Team successfully updated");
});