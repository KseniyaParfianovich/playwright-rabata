import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { HOME_URL } from "../utils/constants";

test(`Check link "Privacy policy" on home page`, async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToPage();
  const privacyPolicyLink = await homePage.getPrivacyPolicyHomePageLink();
  expect(await privacyPolicyLink.count()).toBeGreaterThan(0);

  await homePage.clickPrivacyPolicyHomePageLink();
  expect(await homePage.getPrivacyPolicyModalTitle()).toContain(
    "Privacy Policy"
  );

  await homePage.closePrivacyPolicyModal();
  expect(await homePage.getCurrentURL()).toBe(HOME_URL);
});

test('Check link "Privacy policy" on registration page', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.navigateToRegistrationPage();
  await registrationPage.clickPrivacyPolicyRegistrationPageLink();

  expect(await registrationPage.getPrivacyPolicyModalTitle()).toContain(
    "Privacy Policy"
  );
  await registrationPage.closePrivacyPolicyModal();

  expect(
    await registrationPage.getVerifyRegistrationPageHeaderText()
  ).toContain("Registration");
});
