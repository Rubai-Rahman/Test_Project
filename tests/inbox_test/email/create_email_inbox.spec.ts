import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../../pages/login";
import { LogOutPage } from "../../../pages/logout";

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
//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//create Inbox

test("create email chat", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("link", { name: "Inboxes" }).click();
  await page.getByRole("button", { name: "Add New Inbox" }).click();

  await page
    .locator("div")
    .filter({ hasText: /^Email$/ })
    .nth(1)
    .click();
  await page.getByPlaceholder("enter inbox name").click();
  await page.getByPlaceholder("enter inbox name").fill("PlaywrightTest");
  await page.getByPlaceholder("enter inbox description").click();
  await page
    .getByPlaceholder("enter inbox description")
    .fill("plyawright email testing by rubai ");
  await page.locator("form").click();

  const buttons = await page.$$("button.bg-gray-200");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (i === 0) {
      await button.click();
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("ex: (imap.gmail.com)")
        .click();
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("ex: (imap.gmail.com)")
        .fill("playwright@gmail.com");
      await page.getByPlaceholder("IMAP Username").click();
      await page.getByPlaceholder("IMAP Username").fill("playwrightTest");
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("enter platform port. ex: 465")
        .click();
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("enter platform port. ex: 465")
        .fill("1010");
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("Password")
        .click();
      await page
        .getByRole("group", { name: "IMAP Use setting" })
        .getByPlaceholder("Password")
        .fill("password");
    } else if (i === 1) {
      await button.click();
    } else if (i == 2) {
      await button.click();
    } else if (i === 3) {
      await page.getByPlaceholder("Email Address").click();
      await page.getByPlaceholder("Email Address").fill("testing smtp");
      await page
        .getByPlaceholder("Email Address")
        .fill("testingsmtp@gmail.com");
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("ex: (imap.gmail.com)")
        .click();
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("ex: (imap.gmail.com)")
        .fill("smtp@gmail.com");
      await page.getByPlaceholder("SMTP Username").click();
      await page.getByPlaceholder("SMTP Username").fill("smtpUser");
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("enter platform port. ex: 465")
        .click();
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("enter platform port. ex: 465")
        .fill("465");
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("Password")
        .click();
      await page
        .getByRole("group", { name: "SMTP Use setting" })
        .getByPlaceholder("Password")
        .fill("password");
      await button.click();
    }
  }
  // await page.pause();
  await page.getByRole("button", { name: "Create" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Inbox created successfully!$/ })
      .nth(2)
  ).toHaveText("Inbox created successfully!");
  await page.getByRole("link", { name: "Go to inboxes" }).click();
  await expect(page).toHaveURL("https://devs.fluent.sh/settings/inboxes");
});
