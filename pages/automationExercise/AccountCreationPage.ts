import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class AccountCreationPage extends BaseShopPage {
    readonly mrTitle: Locator
    readonly mrsTitle: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly dayOptions: Locator
    readonly monthOptions: Locator
    readonly yearOptions: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly addressInput: Locator
    readonly countryOption: Locator
    readonly stateInput: Locator
    readonly cityInput: Locator
    readonly zipInput: Locator
    readonly phoneInput: Locator
    readonly createAccountButton: Locator
    readonly continueButton: Locator
    constructor(readonly page: Page) {
        super(page);

        this.mrTitle = page.getByRole('radio', {name: "Mr."})
        this.mrsTitle = page.getByRole('radio', {name: "Mrs."})
        this.nameInput = page.getByRole('textbox', {name:"Name *"})
        this.emailInput = page.getByRole('textbox', {name:"Email *"})
        this.passwordInput = page.getByRole('textbox', {name:"Password *"})
        this.dayOptions = page.getByTestId('days');
        this.monthOptions = page.getByTestId('months');
        this.yearOptions = page.getByTestId('years');
        this.firstNameInput = page.getByRole('textbox', {name:"First name *"})
        this.lastNameInput = page.getByRole('textbox', {name:"Last name *"})
        this.addressInput = page.getByTestId('address')
        this.countryOption = page.getByRole('combobox', {name: "Country"})
        this.stateInput = page.getByTestId('state')
        this.cityInput = page.getByTestId('city')
        this.zipInput = page.getByTestId('zipcode')
        this.phoneInput = page.getByTestId('mobile_number')
        this.createAccountButton = page.getByTestId("create-account")
        this.continueButton = page.getByTestId("continue-button")
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/signup');
    }

    async enterAccountInformation(
        title: string, 
        password: string, 
        day: number,
        month: string,
        year: number,
        firstName: string,
        lastName: string,
        address: string, 
        country: string,
        state: string,
        city: string,
        zipcode: string,
        phone: string,
    ) {
        if (title = "Mr") {
            await this.mrTitle.check()
        } else if (title = "Mrs") {
            await this.mrsTitle.check()
        } else {
            throw new Error("Unkown name title!");
        }
        await this.passwordInput.fill(password)
        await this.dayOptions.selectOption(String(day))
        await this.monthOptions.selectOption(month)
        await this.yearOptions.selectOption(String(year))
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.addressInput.fill(address)
        await this.countryOption.selectOption(country)
        await this.stateInput.fill(state)
        await this.cityInput.fill(city)
        await this.zipInput.fill(zipcode)
        await this.phoneInput.fill(phone)
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async assertOnAccountCreatedPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/account_created');
    }
    async clickContinue() {
        await this.continueButton.click();
    }
}