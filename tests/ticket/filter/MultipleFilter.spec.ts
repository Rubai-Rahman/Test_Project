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
test("Multiple Filter", async ({ page }) => {
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
  await page.getByRole("button", { name: "Add Condition" }).click();
  await page
    .locator(
      "div:nth-child(2) > div > div > div > div > .css-13cymwt-control > .css-hlgwow > .css-19bb58m"
    )
    .first()
    .click();
  await page.getByText("Agent", { exact: true }).click();
  await page
    .locator(
      "div:nth-child(2) > div > div > div > div:nth-child(3) > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg"
    )
    .click();
  await page.locator("#react-select-7-option-9").click();
  await page.getByRole("button", { name: "Add Condition" }).click();
  await page
    .locator(
      "div:nth-child(3) > div > div > div > div > .css-13cymwt-control > .css-hlgwow > .css-19bb58m"
    )
    .first()
    .click();
  await page.getByText("Priority", { exact: true }).click();
  await page
    .locator(
      "div:nth-child(3) > div > div > div > .w-2\\/5 > .css-13cymwt-control > .css-hlgwow"
    )
    .click();
  await page.locator("#react-select-9-option-0").click();
  await page
    .locator(
      "div:nth-child(3) > div > div > div > div:nth-child(3) > .css-13cymwt-control > .css-hlgwow > .css-19bb58m"
    )
    .click();
  await page.getByText("High", { exact: true }).click();
  await page.getByRole("button", { name: "Apply Filter" }).click();
  await expect(page.getByText("Thawab A")).toHaveText("Thawab A");
  await expect(page.getByText("high").first()).toHaveText("high");
  await expect(page.getByText("testing playwright").first()).toHaveText(
    "testing playwright"
  );
});
