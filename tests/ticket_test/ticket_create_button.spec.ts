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
//create button test
test.beforeEach(async ({ page }) => {
  //button test
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://dewan.up.railway.app/tickets/create");

  //contact Test
  await page.getByPlaceholder("Search for Contact").fill("rubairahman");
  await expect(page.getByText("rubairahman1@gmail.com")).toHaveText(
    "rubairahman1@gmail.com"
  );
  await page.getByText("Rubai Rahmanrubairahman1@gmail.com01798100347").click();
});
