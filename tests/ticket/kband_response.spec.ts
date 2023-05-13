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
  await page.getByRole("tab", { name: "history 7" }).click();
  await page
    .getByPlaceholder("Search for Conversation")
    .fill("create ticket from selected contuct1");
  await page.getByText("create ticket from selected contuct1").click();
  await expect(
    page.getByText("create ticket from selected contuct1")
  ).toHaveText("create ticket from selected contuct1");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//

test.skip("Knowledge Base", async ({ page }) => {
  await page.locator('[id="headlessui-tabs-tab-\\:rm\\:"]').click();
  await page.getByPlaceholder("Search for Articles").click();
  await page.getByPlaceholder("Search for Articles").fill("");
  await page.getByRole("heading", { name: "test title" }).click();
  await page.getByRole("heading", { name: "test title" }).click();
  await page.getByRole("img").nth(1).click();
});

test("Response", async ({ page }) => {
  await page.locator('[id="headlessui-tabs-tab-\\:rn\\:"]').click();

  await page.getByPlaceholder("Search for Results").click();
  await page.getByPlaceholder("Search for Results").fill("test shortcut");
  await page.getByRole("button", { name: "test shortcut" }).click();
  await page.getByText("test shortcut", { exact: true });
});
