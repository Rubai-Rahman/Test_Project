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

//chat status change
test("edit tags", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Agent Productivity" }).click();
  await page.getByRole("link", { name: "Tags" }).click();

  await page
    .locator(
      '//*[@id="__next"]/div[1]/div/div/section/div/div/div[2]/div/table/tbody/tr[2]/td[9]/div/button[1]'
    )
    .click();

  await page.getByPlaceholder("Tag name").click();
  await page.getByPlaceholder("Tag name").fill("playwrightTesting");
  await page.getByPlaceholder("Short Description").click();
  await page
    .getByPlaceholder("Short Description")
    .fill("testingAgentProducttivityTags");
  await page
    .locator("div")
    .filter({ hasText: /^Contact Level$/ })
    .click();
  await page.getByPlaceholder("contact").uncheck();
  await page.getByPlaceholder("conversation").uncheck();
  await page.getByPlaceholder("ticket").uncheck();
  await page.getByPlaceholder("article").uncheck();
  await page.getByRole("button", { name: "Update" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "Successfully Updated tag" })
  ).toHaveText("Successfully Updated tag");
});
