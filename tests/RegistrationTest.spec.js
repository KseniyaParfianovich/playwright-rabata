import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { TempMailPage } from "../utils/tempMail";

test("Chesk user registration with UI", async ({ context }) => {
  const fullName = "Random_User";
  const password = "Tellet12345!";
  const tempMailPage = new TempMailPage(await context.newPage());
  await tempMailPage.navigateToTempMail();
  const testEmail = await tempMailPage.getTestEmail();

  const homePage = new HomePage(await context.newPage());
  await homePage.navigateToPage();
  await homePage.goToRegistrationPage();
  const registrationPage = new RegistrationPage(homePage.page);
  await registrationPage.registrationUser(fullName, testEmail, password);
  expect(await registrationPage.getVerifyEmailHeaderText()).toContain(
    "Verify your email"
  );

  await tempMailPage.page.bringToFront();
  await tempMailPage.confirmEmail();

  const loginPage = new LoginPage(await context.waitForEvent("page"));
  await loginPage.loginUser(testEmail, password);

  await tempMailPage.page.bringToFront();
  await tempMailPage.accountConfirmation();
  await tempMailPage.waitForSuccessMassageText();
  await tempMailPage.getSuccessMassageText();

  expect(await tempMailPage.getSuccessMassageText()).toContain(
    "Congratulations! You successfully confirmed your account."
  );
});
