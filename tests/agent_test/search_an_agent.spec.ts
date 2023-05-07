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

test("Search an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByText("playwright@gmail.com").click();
  await page.getByPlaceholder("Search for Agent").click();
  await page.getByPlaceholder("Search for Agent").fill("playwright@gmail.com");
  await page.getByPlaceholder("Search for Agent").press("Enter");
  await expect(
    page.getByRole("cell", { name: "playwright@gmail.com" })
  ).toHaveText("playwright@gmail.com");
});
