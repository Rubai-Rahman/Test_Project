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
test("edit web chat", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("link", { name: "Inboxes" }).click();

  await page
    .locator("tr:nth-child(4) > td:nth-child(7) > div > button")
    .first()
    .click();
  await page.getByPlaceholder("enter inbox description").click();

  await page
    .getByPlaceholder("enter inbox description")
    .fill("testingPlaywrightEdit");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Successfully Updated The Inbox")).toHaveText(
    "Successfully Updated The Inbox"
  );
});
