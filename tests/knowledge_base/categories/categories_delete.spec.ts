import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../../pages/login";
import { LogOutPage } from "../../../pages/logout";
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
//logout

//chat status change
test("delete tags", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Knowledge Base" }).click();
  await page.getByRole("link", { name: "Categories" }).click();
  await page
    .locator(
      '//*[@id="__next"]/div[1]/div/div/section/div/div/div[2]/div/table/tbody/tr[1]/td[8]/div/button[2]'
    )
    .click();

  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Successfully delete a categories" })
  ).toHaveText("Successfully delete a categories");
});
