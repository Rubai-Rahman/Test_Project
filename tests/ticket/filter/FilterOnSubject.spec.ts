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
  await page.getByText("Subject", { exact: true }).click();
  await page.pause();
  await page
    .locator(".css-13cymwt-control > .css-hlgwow > .css-19bb58m")
    .click();
  await page.locator("#react-select-3-option-0").click();
  await page.getByPlaceholder("Write text...").click();
  await page.getByPlaceholder("Write text...").fill("test by adnan.");
  await page.getByRole("button", { name: "Apply Filter" }).click();
  await expect(page.getByText("test by adnan.")).toHaveText("test by adnan.");
});
