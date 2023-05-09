export class LogOutPage {
  page: any;
  modal_button: any;
  logout_button: any;

  constructor(page: any) {
    this.page = page;
    this.modal_button = page.getByRole("button", { name: "Open user menu T" });
    this.logout_button = page.getByText("Sign out");
  }

  async logout() {
    await this.modal_button.click();
    await this.logout_button.click();
  }
}
