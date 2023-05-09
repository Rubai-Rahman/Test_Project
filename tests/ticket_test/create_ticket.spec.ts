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
//create ticket

test("create ticket", async ({ page }) => {
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/tickets/create");

  //contact Test
  await page.getByPlaceholder("Search for Contact").click();
  await page.getByPlaceholder("Search for Contact").fill("playwright");
  await page.getByText("playwright", { exact: true }).click();
  await page.locator('select[name="source"]').selectOption("chat");
  await page
    .locator("div")
    .filter({ hasText: /^Medium$/ })
    .click();
  await page.locator(".css-1xc3v61-indicatorContainer").first().click();
  await page.locator(".css-19bb58m").first().click();
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("PlaywrightTest", { exact: true }).click();
  await page
    .locator(".css-13cymwt-control > .css-onxvpl > .css-19bb58m")
    .click();
  await page.locator("#react-select-3-option-0").click();
  await page.getByRole("combobox", { name: "Ticket Type" }).nth(1).click();
  await page.getByRole("option", { name: "Complaints" }).locator("div").click();
  await page
    .locator("#sq_101")
    .getByRole("combobox", { name: "Category", exact: true })
    .click();
  await page
    .getByRole("option", { name: "Login & Registration" })
    .locator("div")
    .click();
  await page
    .locator("#sq_102")
    .getByRole("combobox", { name: "Sub Category", exact: true })
    .click();
  await page
    .getByRole("option", { name: "Can’t Register" })
    .locator("div")
    .click();
  await page
    .locator("#sq_103")
    .getByRole("combobox", { name: "Sub Sub Category", exact: true })
    .click();
  await page.getByText("Change Phone number").click();
  await page
    .getByRole("combobox", { name: "Sub Sub Category" })
    .getByRole("combobox", { name: "Sub Sub Category", exact: true })
    .filter({ hasText: "Change Phone number" })
    .click();
  await page.getByText("Invalid ID or wrong date of birth.").click();
  await page
    .locator("#sq_122")
    .getByRole("combobox", { name: "Is there a ticket raised to SAMA Care" })
    .click();
  await page.getByRole("option", { name: "No" }).locator("div").click();
  await page.locator('input[name="subject"]').click();
  await page.locator('input[name="subject"]').fill("playwrightTest");
  await page.getByPlaceholder("Write text here ...").click();
  await page.getByPlaceholder("Write text here ...").fill("playwrighttesting");

  await page.getByRole("button", { name: "Create as New" }).click();
  await expect(page.getByText("Failed To Create Ticket")).toHaveText(
    "Failed To Create Ticket"
  );
});
