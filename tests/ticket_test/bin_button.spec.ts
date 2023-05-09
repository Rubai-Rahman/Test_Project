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

//bin button testing
test("cross button test", async ({ page }) => {
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/tickets/create");

  //contact Test
  await page.getByPlaceholder("Search for Contact").fill("Ammar");
  await expect(page.getByText("amar@gmail.sa")).toHaveText("amar@gmail.sa");
  await page.getByText("amar@gmail.sa").click();
  //bin_button test
  await page.locator("section").getByRole("img").nth(1).click();
  await page.getByPlaceholder("Enter your number").click();

  await page
    .locator("div")
    .filter({ hasText: /^Ammaramar@gmail\.sa$/ })
    .getByRole("button")
    .nth(1)
    .click();

  await expect(page.getByText("+966551418354")).toHaveText("+966551418354");
});
