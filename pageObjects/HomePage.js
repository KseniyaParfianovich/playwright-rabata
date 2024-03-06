import { HOME_URL } from "../utils/constants";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.signUpButton = `a[class='header-signup']`;
    this.tryItForFreeButton = 'div[class^="arrow"] a[href="signup"]';
    this.tryItForFreeLink = `div[class^='try'] a[href='signup']`;
    this.privacyPolicyLink = 'a[onclick="modalPrivacy.show()"]';
    this.privacyPolicyModalTitle = "#modalPrivacy .h3";
    this.privacyPolicyModalButton = "#modalPrivacy .btn";
    this.dataApiStoredInput = "#dataApiStoredInput";
    this.dataDownloadInput = "#dataDownloadInput";
    this.rabataMobileApi = "#rabataMobileApi";
    this.azureMobileApi = "#azureMobileApi";
    this.amazonMobileApi = "#amazonMobileApi";
    this.googleMobileApi = "#googleMobileApi";
  }

  async navigateToPage() {
    await this.page.goto(HOME_URL);
  }

  async goToRegistrationPage() {
    await this.page.click(this.signUpButton);
  }

  async clickTryItForFreeButton() {
    await this.page.click(this.tryItForFreeButton);
  }

  async clickTryItForFreeLink() {
    await this.page.click(this.tryItForFreeLink);
  }

  async getPrivacyPolicyHomePageLink() {
    return await this.page.locator(this.privacyPolicyLink);
  }

  async clickPrivacyPolicyHomePageLink() {
    await this.page.click(this.privacyPolicyLink);
  }

  async getPrivacyPolicyModalTitle() {
    const element = await this.page.$(this.privacyPolicyModalTitle);
    return element?.textContent();
  }

  async closePrivacyPolicyModal() {
    await this.page.click(this.privacyPolicyModalButton);
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async getTotalDataStoredValue() {
    return this.page.$eval(this.dataApiStoredInput, el => el.value);
  }

  async getMonthlyDownloadedDataValue() {
    return this.page.$eval(this.dataDownloadInput, el => el.value);
  }

  async extractPrice(locator) {
    const element = await this.page.locator(locator);
    const text = await element.textContent();
    const numericValue = parseInt(text.trim().replace(/[^\d]/g, ""));
    return numericValue;
  }

  async getRabataPrice() {
    return this.extractPrice(this.rabataMobileApi);
  }

  async getAzurePrice() {
    return this.extractPrice(this.azureMobileApi);
  }

  async getAmazonPrice() {
    return this.extractPrice(this.amazonMobileApi);
  }

  async getGooglePrice() {
    return this.extractPrice(this.googleMobileApi);
  }

  async setInputValue(locator, value) {
    const inputElement = await this.page.locator(locator);
    await inputElement.evaluate((input, value) => {
      input.value = value.toString();
      input.dispatchEvent(new Event("input"));
    }, value);
  }

  async setSliderValues(sliderSelectors, sliderValues) {
    for (let i = 0; i < sliderSelectors.length; i++) {
      await this.setInputValue(sliderSelectors[i], sliderValues[i]);
    }
  }

  async getPrices() {
    const [rabataPrice, azurePrice, amazonPrice, googlePrice] =
      await Promise.all([
        this.getRabataPrice(),
        this.getAzurePrice(),
        this.getAmazonPrice(),
        this.getGooglePrice(),
      ]);

    const actualPrices = {
      rabata: rabataPrice,
      azure: azurePrice,
      amazon: amazonPrice,
      google: googlePrice,
    };

    console.log("Actual Prices:", actualPrices);

    return actualPrices;
  }

  getSlidersSelectors = () => [this.dataApiStoredInput, this.dataDownloadInput];
}
