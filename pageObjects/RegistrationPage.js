import { TIMEOUT } from "../utils/constants";

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.registrationPageUrl = "https://rabata.io/signup";
    this.registrationFullNameField = '[placeholder="Full Name"]';
    this.registrationEmailField = '[placeholder="example@example.com"]';
    this.registrationPasswordField = '[placeholder="Password"]';
    this.registrationRepeatPasswordField = '[placeholder="Repeat Password"]';
    this.registrationAgreeCheckbox = "label";
    this.registrationSignUpButton = "button.btn";
    this.verifyEmailHeader = ".h2";
    this.logInButton = `a[class^='btn']`;
    this.privacyPolicyLink = `span[onclick^='modalPrivacy']`;
    this.verifyRegistrationPageHeader = "div.h2";
    this.privacyPolicyModalTitle = "#modalPrivacy .h3";
    this.privacyPolicyModalButton = "#modalPrivacy .btn";
  }

  async navigateToRegistrationPage() {
    await this.page.goto(this.registrationPageUrl);
  }

  async registrationUser(fullName, email, password) {
    await this.page.fill(this.registrationFullNameField, fullName);
    await this.page.fill(this.registrationEmailField, email);
    await this.page.fill(this.registrationPasswordField, password);
    await this.page.fill(this.registrationRepeatPasswordField, password);
    await this.page.click(this.registrationAgreeCheckbox);
    await this.page.click(this.registrationSignUpButton);
  }

  async getVerifyEmailHeaderText() {
    const element = await this.page.$(this.verifyEmailHeader);
    return element?.textContent();
  }

  async clicklogInButton() {
    await this.page.click(this.logInButton);
  }

  async clickPrivacyPolicyRegistrationPageLink() {
    await this.page.click(this.privacyPolicyLink);
  }

  async getPrivacyPolicyModalTitle() {
    const element = await this.page.$(this.privacyPolicyModalTitle);
    return element?.textContent();
  }

  async closePrivacyPolicyModal() {
    await this.page.click(this.privacyPolicyModalButton);
  }

  async getVerifyRegistrationPageHeaderText() {
    const element = await this.page.$(this.verifyRegistrationPageHeader);
    return element?.textContent();
  }
}
