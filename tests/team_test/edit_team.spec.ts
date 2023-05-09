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

//edit Team
test("editTeam", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .locator(
      '//*[@id="__next"]/div[1]/div/div/section/section/div[2]/div/table/tbody/tr[2]/td[6]/div/button[1]'
    )
    .click();

  await page.locator(".css-19bb58m").first().click();
  await page.getByPlaceholder("Team Name").click();
  await page.getByPlaceholder("Team Description").dblclick();
  await page.getByPlaceholder("Team Description").fill("testingPlaywrightTeam");
  await page.getByRole("button", { name: "Update Team" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Team successfully updated " })
  ).toHaveText("Team successfully updated");
});
