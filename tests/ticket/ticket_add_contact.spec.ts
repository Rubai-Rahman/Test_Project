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

//logout

test("manual contact", async ({ page }) => {
  await page.getByRole("link", { name: "ticketing" }).click();
  await page.getByRole("button", { name: "Create New" }).click();
  await page.getByRole("button", { name: "Add Contact" }).click();

  await page
    .locator('input[name="name"]')
    .fill("Contact Manually Added for Playwright Test");
  await page.locator('input[name="email"]').fill("dev.habiburnobel@gmail.com");
  await page.locator('input[name="phone_number"]').fill("01521320912");
  await page.getByRole("button", { name: "Create Contact" }).click();
  await expect(page.getByText("Successfully create a contact")).toHaveText(
    "Successfully create a contact"
  );
});
