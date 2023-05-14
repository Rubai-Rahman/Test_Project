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
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
//

test("Edit Ticket", async ({ page }) => {
  await page.pause();
  await page.getByPlaceholder("Search for Conversation").click();
  await page
    .getByPlaceholder("Search for Conversation")
    .fill("create ticket from selected contuct1");
  await page.getByText("create ticket from selected contuct1").click();
  // await page.pause();
  await page.getByRole("tab", { name: "t" }).click();
  await page.getByRole("tabpanel", { name: "t" }).getByRole("button").click();

  await expect(page.getByText("Ticket Properties")).toHaveText(
    "Ticket Properties"
  );
  await page.locator('select[name="priority"]').selectOption("1");
  await page
    .getByRole("tabpanel", { name: "t" })
    .locator("button")
    .first()
    .click();
  await expect(
    page.getByText("Conversation successfully linked to ticket.")
  ).toHaveText("Conversation successfully linked to ticket.");
});
