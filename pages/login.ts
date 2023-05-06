export class LoginPage {
  page: any;
  email_textbox: any;
  password_textbox: any;
  signIn_button: any;
  email_next_button: any;
  password_next_button: any;

  constructor(page: any) {
    this.page = page;
    this.signIn_button = page.getByRole("button", {
      name: "Sign In With Google",
    });
    this.email_textbox = page.getByRole("textbox", { name: "Email or phone" });
    this.email_next_button = page.getByRole("button", { name: "Next" });
    this.password_textbox = page.getByRole("textbox", {
      name: "Enter your password",
    });
    this.password_next_button = page.locator("id=passwordNext");
  }

  async gotoLoginPage() {
    await this.page.goto("https://dewan.up.railway.app/en/auth/login");
  }
  async login(email, password) {
    await this.signIn_button.click();
    await this.email_textbox.fill(email);
    await this.email_next_button.click();
    await this.password_textbox.fill(password);
    await this.password_next_button.click();
  }
}
