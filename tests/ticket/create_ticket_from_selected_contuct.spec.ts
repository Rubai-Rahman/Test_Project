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
//

test("create a ticket from selected contact", async ({ page }) => {
  await page.getByRole("link", { name: "Ticketing" }).click();
  await page.getByRole("tab", { name: "history 7" }).click();

  await page
    .locator('//*[@id="__next"]/div[1]/div/div/div[1]/div[1]/div[1]/input')
    .click();
  await page
    .locator('//*[@id="__next"]/div[1]/div/div/div[1]/div[1]/div[1]/input')
    .fill("Playwright Test Ticket");

  await page.getByText("Playwright Test Ticket").first().click();
  await page.locator(".w-10 > .text-blueCustom").first().click();

  await page.locator('select[name="source"]').selectOption("chat");
  await page.getByLabel("High").check();

  await page.locator('select[name="assigned_team"]').selectOption("18");
  await page.locator('select[name="assigned_agent"]').selectOption("71");
  await page.getByRole("combobox", { name: "Ticket Type" }).nth(1).click();
  await page.getByRole("option", { name: "Request" }).locator("div").click();
  await page.getByPlaceholder("Category...").click();
  await page.getByText("Claim and Dispute").click();
  await page.getByPlaceholder("Sub Category...").click();
  await page
    .getByRole("option", { name: "ATM did not dispense" })
    .locator("div")
    .click();
  await page.getByPlaceholder("Transaction Source...").click();
  await page.getByPlaceholder("Transaction Source...").fill("123456");
  await page.getByPlaceholder("Yes/No").click();
  await page.getByText("No", { exact: true }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Ticket Title$/ })
    .click();
  await page
    .locator('input[name="subject"]')
    .fill("testing ticket create from contact ");
  await page.getByPlaceholder("Write text here ...").click();
  await page
    .getByPlaceholder("Write text here ...")
    .fill("create ticket from selected contuct");
  await page.getByRole("button", { name: "Create ticket" }).click();
  await page.getByText("Successfully created a ticket").click();
});
