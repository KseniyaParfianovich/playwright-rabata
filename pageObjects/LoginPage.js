export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginPageUrl = "https://rabata.io/login";
    this.loginEmailFild = '[placeholder="E-mail"]';
    this.loginPasswordFild = '[placeholder="Password"]';
    this.loginSubmitButton = `button[type='submit']`;
  }

  async navigateToLoginPage() {
    await this.page.goto(this.loginPageUrl);
  }

  async loginUser(email, password) {
    await this.page.fill(this.loginEmailFild, email);
    await this.page.fill(this.loginPasswordFild, password);
    await this.page.click(this.loginSubmitButton);
  }
}
