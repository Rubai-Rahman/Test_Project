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
//logout

//create Inbox

test("delete tags", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Agent Productivity" }).click();
  await page.getByRole("link", { name: "Tags" }).click();
  await page.getByRole("button", { name: "Add New Tag" }).click();
  await page.getByPlaceholder("Tag name").fill("playwrightTesting");
  await page.getByPlaceholder("Short Description").click();
  await page
    .getByPlaceholder("Short Description")
    .fill("testingAgentProducttivityTags");
  await page.getByPlaceholder("contact").check();
  await page.getByPlaceholder("conversation").check();
  await page
    .getByText(
      "NameShort DescriptionChoose Tag LevelContact LevelConversation LevelTicket Level"
    )
    .click();
  await page.getByPlaceholder("ticket").check();
  await page.getByPlaceholder("article").check();
  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "Successfully created a tag" })
  ).toHaveText("Successfully created a tag");
});
