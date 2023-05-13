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
//create ticket
test("create a new ticket", async ({ page }) => {
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/tickets/create");

  //contact Test
  await page.getByPlaceholder("Search for Contact").click();
  await page
    .getByPlaceholder("Search for Contact")
    .fill("Md. Habibur Rahaman Nobel");
  await page.getByText("Md. Habibur Rahaman Nobel", { exact: true }).click();
  await page.locator('select[name="source"]').selectOption("email");
  await page.getByLabel("Medium").check();

  await page.locator(".css-19bb58m").first().click();
  await page.locator("#react-select-2-option-1").click();

  await page
    .locator(".css-13cymwt-control > .css-onxvpl > .css-19bb58m")
    .click();
  await page.getByText("Thawab A", { exact: true }).click();
  // await page.pause();
  // await page.locator('select[name="assigned_team"]').selectOption("112");
  // await page.locator('select[name="assigned_agent"]').selectOption("232");
  await page.getByPlaceholder("Ticket Type").click();
  await page.getByText("Inquiry").click();
  await page.getByPlaceholder("Category...").click();
  await page.getByText("Cards").click();
  await page.getByPlaceholder("Sub Category...").click();
  await page.getByText("Card replacement").click();
  await page.getByPlaceholder("Yes/No").click();
  await page.getByRole("option", { name: "Yes" }).locator("div").click();
  await page.getByPlaceholder("Enter Sama ticket ID").click();
  await page.getByPlaceholder("Enter Sama ticket ID").fill("123456");

  await page.locator('input[name="subject"]').click();
  await page.locator('input[name="subject"]').fill("Playwright Test Ticket1");
  await page.getByPlaceholder("Write text here ...").click();
  await page.getByPlaceholder("Write text here ...").fill("test");

  await page.getByRole("button", { name: "Create as New" }).click();
  await expect(page.getByText("Playwright Test Ticket1").first()).toHaveText(
    "Playwright Test Ticket1"
  );
});
