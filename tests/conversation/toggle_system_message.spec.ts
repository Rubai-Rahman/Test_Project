import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("thawab@alt.sa.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
  await page.getByRole("tab", { name: "pending" }).click();
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

test("assign_agnet Test ", async ({ page }) => {
  await page.pause();
});
