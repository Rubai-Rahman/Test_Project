export class LoginPage {
  page: any;
  email_textbox: any;
  password_textbox: any;
  signIn_button: any;

  constructor(page: any) {
    this.page = page;

    this.email_textbox = page.getByLabel("Email");

    this.password_textbox = page.getByLabel("Password");
    this.signIn_button = page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
  }

  async gotoLoginPage() {
    await this.page.goto("https://devs.fluent.sh/");
  }
  async login(email, password) {
    await this.email_textbox.click();
    await this.email_textbox.fill(email);
    await this.password_textbox.click();
    await this.password_textbox.fill(password);
    await this.signIn_button.click();
  }
}
