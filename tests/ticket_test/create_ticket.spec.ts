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
//create ticket

test("create ticket", async ({ page }) => {
  await page.locator('select[name="source"]').selectOption("chat");
  await page
    .locator("div")
    .filter({ hasText: /^Teamselect a team$/ })
    .locator("svg")
    .click();
  await page.getByText("PlawrightTest", { exact: true }).click();
  await page.locator("div").filter({ hasText: /^Low$/ }).click();
  await page
    .locator(
      "div:nth-child(2) > .rounded > .w-full > .css-13cymwt-control > .css-onxvpl > .css-19bb58m"
    )
    .click();
  await page.getByText("al amin", { exact: true }).click();
  await page.locator('input[name="subject"]').click();
  await page.locator('input[name="subject"]').fill("playwright");
  await page.getByPlaceholder("Write text here ...").click();
  await page.getByPlaceholder("Write text here ...").fill("testing playwright");
  await page.getByRole("button", { name: "Create as New" }).click();
  await expect(page.getByRole("button", { name: "Create as New" })).toHaveText(
    "Create as New"
  );
});
