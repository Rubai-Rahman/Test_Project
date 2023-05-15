import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("thawab@alt.sa.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
  await page.getByRole("tab", { name: "pending 2" }).click();
  await page.getByPlaceholder("Search for Conversation").click();
  await page.getByPlaceholder("Search for Conversation").fill("tweeq user 1");

  await page
    .getByRole("link", {
      name: "T Tweeq User 1 3 No messages for this null",
    })
    .click();
  await expect(page.getByRole("button", { name: "Get Tweeq Info" })).toHaveText(
    "Get Tweeq Info"
  );
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});

test("close message ", async ({ page }) => {
  await page.getByRole("button", { name: "close" }).click();
  await page.locator("#sq_100").getByRole("combobox").first().click();
  await page.getByText("Request").click();
  await page.locator("#sq_104").getByRole("combobox").first().click();
  await page.getByRole("option", { name: "Account" }).locator("div").click();
  await page.getByPlaceholder("Sub Category...").click();
  await page.getByText("Account clearance").click();
  await page.getByLabel("resolved").check();
  await page.locator(".ProseMirror").click();
  await page.locator(".ProseMirror").fill("testing close message ");
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByText("Conversation Closed")).toHaveText(
    "Conversation Closed"
  );
});
