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

test("Edit Contact from Right Side", async ({ page }) => {
  await page.getByPlaceholder("Search for Conversation").click();
  await page
    .getByPlaceholder("Search for Conversation")
    .fill("create ticket from selected contuct1");
  await page.getByText("create ticket from selected contuct1").click();
  await page.locator("div:nth-child(2) > .text-blueCustom").click();
  await page.locator('input[name="phone_number"]').click();
  await page.locator('input[name="phone_number"]').fill("01611627761");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Contact Updated Successfully")).toHaveText(
    "Contact Updated Successfully"
  );
});
