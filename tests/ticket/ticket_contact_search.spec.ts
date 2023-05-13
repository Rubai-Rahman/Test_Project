import { test, expect, chromium } from "@playwright/test";
import { LogOutPage } from "../../pages/logout";
import { LoginPage } from "../../pages/login";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("dev.habiburnobel@gmail.com", "Thawab@123");
  await expect(page).toHaveURL("https://devs.fluent.sh/dashboard");
  await page.getByRole("link", { name: "Ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/tickets/create");
});
//logout
test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});

//logout
//pass
test.skip("search Test ", async ({ page }) => {
  await page.getByPlaceholder("Search for Contact").click();
  await page.getByPlaceholder("Search for Contact").fill("Ammar");
  await expect(page.getByText("amar@gmail.sa")).toHaveText("amar@gmail.sa");
});

//pass
test.skip("edit test", async ({ page }) => {
  await page.getByPlaceholder("Search for Contact").click();
  await page.getByPlaceholder("Search for Contact").fill("playwright");
  await expect(page.getByText("playwright@gmail.com")).toHaveText(
    "playwright@gmail.com"
  );

  await page.getByText("playwright@gmail.com").click();
  await page.locator("section").getByRole("img").nth(1).click();
  await page.getByPlaceholder("Enter your number").click();
  await page.getByPlaceholder("Enter your number").fill("01798100555");
  await page
    .locator("div")
    .filter({ hasText: /^playwrightplaywright@gmail\.com$/ })
    .getByRole("button")
    .first()
    .click();

  await expect(page.getByText("01798100555")).toHaveText("01798100555");
});

//passed
//cross button test
test.skip("cross button test", async ({ page }) => {
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

//delete button
test("bin button ", async ({ page }) => {
  await page.getByPlaceholder("Search for Contact").click();
  await page.getByPlaceholder("Search for Contact").fill("playwright");
  await expect(page.getByText("playwright@gmail.com")).toHaveText(
    "playwright@gmail.com"
  );

  await page.getByText("playwright@gmail.com").click();
  await page.locator("section").getByRole("img").nth(1).click();
  await page.getByPlaceholder("Enter your number").click();
  await page.getByPlaceholder("Enter your number").fill("01798100655");
  await page
    .locator("div")
    .filter({ hasText: /^playwrightplaywright@gmail\.com$/ })
    .getByRole("button")
    .nth(1)
    .click();

  await expect(page.getByText("01798100555")).toHaveText("01798100555");
});
