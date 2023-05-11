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
test("edit email chat", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("link", { name: "Inboxes" }).click();
  await page.pause();
  await page
    .locator("tr:nth-child(6) > td:nth-child(7) > div > button")
    .first()
    .click();
  await page.getByPlaceholder("enter inbox description").click();
  await page
    .getByPlaceholder("enter inbox description")
    .fill("testing playwright email");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Email Inbox Updated Successfully")).toHaveText(
    "Email Inbox Updated Successfully"
  );
});
