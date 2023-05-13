import { test, expect, chromium } from "@playwright/test";
import { LogOutPage } from "../../pages/logout";
import { LoginPage } from "../../pages/login";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("dev.habiburnobel@gmail.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//create Team

test("create new button check from ticket page", async ({ page }) => {
  await page.getByRole("link", { name: "Ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  //await page.pause();
  await expect(
    page.getByRole("heading", { name: "Create New Ticket" })
  ).toHaveText("Create New Ticket");
});
