import { TIMEOUT } from "./constants";

export class TempMailPage {
  constructor(page) {
    this.page = page;
    this.tempMailUrl = "https://tempmail.plus/ru/#!";
    this.temporaryEmailField = "#pre_button";
    this.temporaryEmailBackButton = `span[data-tr='back']`;
    this.successMassageText = "tbody tr h1:nth-child(2)";
  }

  async navigateToTempMail() {
    await this.page.goto(this.tempMailUrl);
  }

  async getTestEmail() {
    const testEmail = await this.page.$eval(
      this.temporaryEmailField,
      input => input.value + "@mailto.plus"
    );
    console.log("Текущий адрес временной почты:", testEmail);
    return testEmail;
  }

  async confirmEmail() {
    await this.page.getByText("Please Confirm your Email").click();
    await this.page.getByRole("link", { name: "Confirm my Email" }).click();
  }

  async accountConfirmation() {
    await this.page.click(this.temporaryEmailBackButton);
    await this.page.getByText("Account confirmed").click();
  }

  async waitForSuccessMassageText() {
    await this.page.waitForSelector(this.successMassageText, {
      timeout: TIMEOUT,
    });
  }

  async getSuccessMassageText() {
    const element = await this.page.$(this.successMassageText);
    return element ? await element.textContent() : "";
  }
}
