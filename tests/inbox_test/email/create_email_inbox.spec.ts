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

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//create Inbox

test("create email chat", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("link", { name: "Inboxes" }).click();
  await page.getByRole("button", { name: "Add New Inbox" }).click();

  await page
    .locator("div")
    .filter({ hasText: /^Email$/ })
    .nth(1)
    .click();
  await page.getByPlaceholder("enter inbox name").click();
  await page.getByPlaceholder("enter inbox name").fill("PlaywrightTest");
  await page.getByPlaceholder("enter inbox description").click();
  await page
    .getByPlaceholder("enter inbox description")
    .fill("playwrightTesting for email");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByText("Inbox created successfully!")).toHaveText(
    "Inbox created successfully!"
  );
  await page.getByRole("link", { name: "Go to inboxes" }).click();

  await expect(page).toHaveURL("https://devs.fluent.sh/settings/inboxes");
});
