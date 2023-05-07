import { test, expect, chromium } from "@playwright/test";
import { LogOutPage } from "../../pages/logout";
import { LoginPage } from "../../pages/login";

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
//create Team

test("create team", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page.getByRole("button", { name: "Add Team" }).click();
  await page.getByPlaceholder("Team Name").fill("PlaywrightTest");
  await page.getByPlaceholder("Team Description").fill("testingPlaywright");
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("al amin", { exact: true }).click();
  await page.getByRole("heading", { name: "Add Team Members 1" }).click();
  await page.getByRole("button", { name: "Create Team" }).click();
  await expect(page.getByText("New team successfully created")).toHaveText(
    "New team successfully created"
  );
});
