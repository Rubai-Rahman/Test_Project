import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";
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
test("search", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Agent Productivity" }).click();
  await page.getByRole("link", { name: "Tags" }).click();
  await page.getByPlaceholder("Search for tag").click();
  await page.getByPlaceholder("Search for tag").fill("playwright");
  await expect(page.getByText("playwrightTesting")).toHaveText(
    "playwrightTesting"
  );
});
