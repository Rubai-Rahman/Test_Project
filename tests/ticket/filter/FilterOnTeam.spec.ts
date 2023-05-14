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
test("Filter on Subject", async ({ page }) => {
  await page.locator(".mr-4 > .text-grayCustom").click();
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("Team", { exact: true }).click();
  await page
    .locator(".css-13cymwt-control > .css-hlgwow > .css-19bb58m")
    .first()
    .click();
  await page.locator("#react-select-3-option-0").click();
  await page
    .locator(
      "div:nth-child(3) > .css-13cymwt-control > .css-hlgwow > .css-19bb58m"
    )
    .click();
  await page.getByText("PlawrightTest", { exact: true }).click();

  await page.getByRole("button", { name: "Apply Filter" }).click();
  // await page.getByText("Amount on hold", { exact: true }).click();
  // await page.getByText("Hold not released").click();
  await expect(page.getByText("testing playwright").first()).toHaveText(
    "testing playwright"
  );
});
