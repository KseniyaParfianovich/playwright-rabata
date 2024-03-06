import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { DashboardPage } from "../pageObjects/DashboardPage";

async function stepsForTryItForFreeVerify(
  registrationPage,
  loginPage,
  dashboardPage
) {
  await registrationPage.clicklogInButton();
  await loginPage.loginUser("lyshkoolga@gmail.com", "Tellet12345!");
  await dashboardPage.waitForDashboardHeader();
}

test.describe('Check "Try it for free" links', () => {
  let homePage;
  let registrationPage;
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await homePage.navigateToPage();
  });

  test('Check "Try it for free" link A', async () => {
    await homePage.clickTryItForFreeButton();

    await stepsForTryItForFreeVerify(
      registrationPage,
      loginPage,
      dashboardPage
    );

    expect(await dashboardPage.getVerifyDashboardHeaderText()).toContain(
      "Dashboard"
    );
  });

  test('Check "Try it for free" link B', async ({ page }) => {
    await homePage.clickTryItForFreeLink();

    await stepsForTryItForFreeVerify(
      registrationPage,
      loginPage,
      dashboardPage
    );

    expect(await dashboardPage.getVerifyDashboardHeaderText()).toContain(
      "Dashboard"
    );
  });
});
