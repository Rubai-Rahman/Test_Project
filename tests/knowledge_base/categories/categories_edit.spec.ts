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
test("edit categories", async ({ page }) => {
  //await page.pause();
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Knowledge Base" }).click();
  await page.getByRole("link", { name: "Categories" }).click();
  await page
    .locator(
      '//*[@id="__next"]/div[1]/div/div/section/div/div/div[2]/div/table/tbody/tr[1]/td[8]/div/button[1]'
    )
    .click();
  await page
    .getByRole("combobox", { name: "Choose Language" })
    .selectOption("english");
  await page.getByPlaceholder("Categories Name").click();
  await page.getByPlaceholder("Categories Name").fill("editCategories");
  await page.getByPlaceholder("Short Description").click();
  await page
    .getByPlaceholder("Short Description")
    .fill("playwrightTest by rubai edit");
  await page.getByRole("button", { name: "Update" }).click();

  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Successfully Updated categories" })
  ).toHaveText("Successfully Updated categories");
});
