import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";

let homePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigateToPage();
});

test("Check the default status of calculators", async () => {
  const expectedPrices = {
    rabata: 36000,
    azure: 50400,
    amazon: 60000,
    google: 74400,
  };

  const [totalDataStoredValue, monthlyDownloadedDataValue] = await Promise.all([
    homePage.getTotalDataStoredValue(),
    homePage.getMonthlyDownloadedDataValue(),
  ]);

  expect(totalDataStoredValue).toBe("100");
  expect(monthlyDownloadedDataValue).toBe("100");

  const actualPrices = await homePage.getPrices();
  expect(actualPrices).toEqual(expectedPrices);
});

test("Check the minimum slider values for both calculators", async () => {
  const sliderValues = [1, 1];
  const expectedPrices = {
    rabata: 360,
    azure: 504,
    amazon: 600,
    google: 744,
  };

  await homePage.setSliderValues(homePage.getSlidersSelectors(), sliderValues);
  const actualPrices = await homePage.getPrices();

  expect(actualPrices).toEqual(expectedPrices);
});

test("Сheck the maximum slider values for both calculators", async () => {
  const sliderValues = [1000, 1000];
  const expectedPrices = {
    rabata: 360000,
    azure: 504000,
    amazon: 600000,
    google: 744000,
  };

  await homePage.setSliderValues(homePage.getSlidersSelectors(), sliderValues);
  const actualPrices = await homePage.getPrices();

  expect(actualPrices).toEqual(expectedPrices);
});

test("Check the arbitrary values of both sliders for both calculators", async () => {
  const sliderValues = [500, 750];
  const expectedPrices = {
    rabata: 225000,
    azure: 315000,
    amazon: 375000,
    google: 465000,
  };

  await homePage.setSliderValues(homePage.getSlidersSelectors(), sliderValues);
  const actualPrices = await homePage.getPrices();

  expect(actualPrices).toEqual(expectedPrices);
});
