import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("thawab@alt.sa.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});

test("delete agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page
    .locator(
      '//*[@id="__next"]/div[1]/div/div/section/section/div[2]/div/table/tbody/tr[2]/td[8]/div/button[2]'
    )
    .click();

  await page
    .getByPlaceholder('Please type "PlaywrightTest" to confirm delete')
    .click();
  await page
    .getByPlaceholder('Please type "PlaywrightTest" to confirm delete')
    .fill("PlaywrightTest");
  await page.getByRole("button", { name: "Yes, Delete" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "Agent deleted successfully" })
  ).toHaveText("Agent deleted successfully");
});
