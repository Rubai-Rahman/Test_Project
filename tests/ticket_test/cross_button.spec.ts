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

//cross button test
test("cross button test", async ({ page }) => {
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/tickets/create");

  //contact Test
  await page.getByPlaceholder("Search for Contact").fill("Ammar");
  await expect(page.getByText("amar@gmail.sa")).toHaveText("amar@gmail.sa");
  await page.getByText("amar@gmail.sa").click();
  await page
    .locator("form")
    .filter({
      hasText: "amar@gmail.sa",
    })
    .getByRole("button")
    .nth(1)
    .click();
  await expect(page.getByText("No Contacts selected yet!")).toHaveText(
    "No Contacts selected yet!"
  );
});
