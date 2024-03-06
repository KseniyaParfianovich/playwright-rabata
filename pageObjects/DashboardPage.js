import { TIMEOUT } from "../utils/constants";

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardUrl = "https://rabata.io/dashboard";
    this.verifyDashboardHeader = ".h2.heading";
  }

  async navigateToDashboard() {
    await this.page.goto(this.dashboardUrl);
  }

  async waitForDashboardHeader() {
    await this.page.waitForSelector(this.verifyDashboardHeader, {
      timeout: TIMEOUT,
    });
  }

  async getVerifyDashboardHeaderText() {
    const element = await this.page.$(this.verifyDashboardHeader);
    return element ? await element.textContent() : "";
  }
}
