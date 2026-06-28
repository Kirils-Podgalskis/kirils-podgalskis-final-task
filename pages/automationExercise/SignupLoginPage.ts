import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class SignupLoginPage extends BaseShopPage {
    readonly loginEmailInput: Locator
    readonly loginPasswordInput: Locator
    readonly loginButton: Locator

    readonly signupNameInput: Locator
    readonly signupEmailInput: Locator
    readonly signupButton: Locator
    constructor(readonly page: Page) {
        super(page);

        this.loginEmailInput = page.getByTestId("login-email")
        this.loginPasswordInput = page.getByTestId("login-password")
        this.loginButton = page.getByTestId("login-button")

        this.signupNameInput = page.getByTestId("signup-name")
        this.signupEmailInput = page.getByTestId("signup-email")
        this.signupButton = page.getByTestId("signup-button")
    }

    async goto() {
        await this.page.goto("/login")
        await this.clickConsent();
    }

    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/login');
        await this.deleteAdsContainer()
    }

    async fillSignupInputs(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickSignup() {
        await this.signupButton.click();
    }
}
