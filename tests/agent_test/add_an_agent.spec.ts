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

//add an agent
test("Add Agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Add Agent" }).click();
  await page.getByPlaceholder("Please enter a name of the agent").click();
  await page
    .getByPlaceholder("Please enter a name of the agent")
    .fill("PlaywrightTest");
  await page.getByPlaceholder("Please enter phone number").click();
  await page.getByPlaceholder("Please enter phone number").fill("55555");
  await page
    .getByPlaceholder("Please enter an email address of the agent")
    .click();
  await page
    .getByPlaceholder("Please enter an email address of the agent")
    .fill("playwright@gmail.com");

  await page.getByRole("button", { name: "Add" }).click();
  // await expect(page.getByText("Agent added successfully")).toHaveText(
  //   "Agent added successfully"
  // );
  //expect for existing user
  await expect(page.getByText("Agent already added!")).toHaveText(
    "Agent already added!"
  );
});
