import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { LogOutPage } from "../pages/logout";

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

//parallel testing
test.describe.configure({ mode: "parallel" });
//create Team

test("runs in parallel 1", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page.getByRole("button", { name: "Add Team" }).click();
  await page.getByPlaceholder("Team Name").fill("PlaywrightTest");
  await page.getByPlaceholder("Team Description").fill("testingPlaywright");
  await page.locator(".css-19bb58m").first().click();
  await page.getByText("al amin", { exact: true }).click();
  await page.getByRole("heading", { name: "Add Team Members 1" }).click();
  await page.getByRole("button", { name: "Create Team" }).click();
  await expect(page.getByText("New team successfully created")).toHaveText(
    "New team successfully created"
  );
});

//Team status change
test.skip("status", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest testing Playwright 2 - Use setting",
    })
    .getByRole("switch", { name: "Use setting" })
    .click();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: " Successfully Updated The Status" })
  ).toHaveText("Successfully Updated The Status");
});
//edit Team
test.skip("editTeam", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest testing Playwright 3 - Use setting",
    })
    .getByRole("button")
    .first()
    .click();
  await page.locator('button[name="\\32 49"]').click();
  await page.getByRole("button", { name: "Update Team" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Team successfully updated " })
  ).toHaveText("Team successfully updated");
});

//delete a team
test("runs in parallel 2", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Team" }).click();
  await page.getByRole("link", { name: "Teams" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest",
    })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .getByPlaceholder("Please type PlaywrightTest to confirm")
    .fill("PlaywrightTest");
  await page.getByRole("button", { name: "Delete Playwright" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "Team deleted successfully" })
  ).toHaveText("Team deleted successfully.");
});
