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

//create Inbox

test("delete tags", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Knowledge Base" }).click();
  await page.getByRole("link", { name: "Categories" }).click();
  await page.getByRole("button", { name: "Add New Category" }).click();
  await page.getByPlaceholder("name").click();
  await page.getByPlaceholder("name").fill("PlaywrightTest");
  await page
    .getByRole("combobox", { name: "Choose Language" })
    .selectOption("english");
  await page.getByPlaceholder("Short Description").click();
  await page
    .getByPlaceholder("Short Description")
    .fill("playwrightTest by rubai");
  await page.getByRole("button", { name: "Create" }).click();

  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Successfully Create a categories" })
  ).toHaveText("Successfully Create a categories");
});
