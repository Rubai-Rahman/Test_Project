import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LogOutPage } from "../../pages/logout";

//login
test.beforeEach(async ({ page }) => {
  const Login = new LoginPage(page);
  await Login.gotoLoginPage();
  await Login.login("rubairahman1@gmail.com", "password");
  await expect(page).toHaveURL("https://dewan.up.railway.app/dashboard");
});

//logout

test.afterEach(async ({ page }) => {
  const Logout = new LogOutPage(page);
  await Logout.logout();
});
// add manual contact
test.skip("manual contact", async ({ page }) => {
  await page.getByRole("button", { name: "Add Contact" }).click();
  await page.getByRole("button", { name: "Add Contact" }).click();
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill("PlaywrightTest");
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill("playwrighttest@gmail.com");
  await page.locator('input[name="phone_number"]').click();
  await page.locator('input[name="phone_number"]').fill("01798100347");
  await page.getByRole("button", { name: "Create Contact" }).click();
  await page
    .locator("form")
    .filter({
      hasText:
        "RRubai Rahmanrubairahman1@gmail.com 01798100347 Add ContactTicket PropertiesSour",
    })
    .click();
  await expect(page.getByText("contact created successfully ")).toHaveText(
    "successfully"
  );
});