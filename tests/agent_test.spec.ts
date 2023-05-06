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

 //add an agent
test.skip("Add Agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByRole("button", { name: "Add Agent" }).click();
  await page.getByPlaceholder("Please enter a name of the agent").click();
  await page
    .getByPlaceholder("Please enter a name of the agent")
    .fill("PlaywrightTest");
  await page.getByPlaceholder("Please enter phone number").click();
  await page.getByPlaceholder("Please enter phone number").fill("55555");
  await page
    .getByPlaceholder("Please enter an email address of the agent")
    .click();
  await page
    .getByPlaceholder("Please enter an email address of the agent")
    .fill("playwright@gmail.com");

  await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByText("Agent added successfully")).toHaveText(
    "Agent added successfully"
  );
  //expect for existing user
  // await expect(page.getByText("Agent already added!")).toHaveText(
  //   "Agent already added!"
  // );
});
//
 //change the status of an agent
test.skip("Change the status of an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest",
    })
    .getByRole("switch", { name: "Use setting" })
    .click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Status changed successfully" })
  ).toHaveText("Status changed successfully");
});

 //search an agent
test.skip("Search an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page.getByText("playwright@gmail.com").click();
  await page.getByPlaceholder("Search for Agent").click();
  await page.getByPlaceholder("Search for Agent").fill("playwright@gmail.com");
  await page.getByPlaceholder("Search for Agent").press("Enter");
  await expect(
    page.getByRole("cell", { name: "playwright@gmail.com" })
  ).toHaveText("playwright@gmail.com");
});

//edit an agent
test.skip("edit an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest",
    })
    .getByRole("button")
    .first()
    .click();

  await page.getByRole("combobox").selectOption("supervisor");
  await page.getByRole("button", { name: "Edit Agent" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Agent updated successfully" })
  ).toHaveText("Agent updated successfully");
});

//delete an agent
test("delete an agent", async ({ page }) => {
  await page.getByRole("link", { name: "settings" }).click();
  await page
    .getByRole("row", {
      name: "PlaywrightTest",
    })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .getByPlaceholder('Please type "PlaywrightTest" to confirm delete')
    .fill("PlaywrightTest");
  await page.getByRole("button", { name: "Yes, Delete" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Agent deleted successfully" })
  ).toHaveText("Agent deleted successfully");
});
