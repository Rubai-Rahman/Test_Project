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

test("Close Filter Button", async ({ page }) => {
  await page.locator(".text-grayCustom > path").click();
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("Agent", { exact: true }).click();
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
  await page.locator("#react-select-4-option-9").click();
  await page.getByRole("button", { name: "Apply Filter" }).click();
  await page.getByRole("button", { name: "Clear Filter" }).click();
});
