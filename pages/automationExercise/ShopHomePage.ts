import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ShopHomePage extends BaseShopPage {
    readonly signupLoginButton: Locator;
    readonly productsButton: Locator
    readonly subscribeEmailInput: Locator
    readonly subscribeSubmitButton: Locator
    readonly subscribtionSuccessLabel: Locator

    constructor(readonly page: Page) {
        super(page);

        this.signupLoginButton = page.getByRole('link', { name: "Signup / Login", exact: false })
        this.productsButton = page.getByRole('link', { name: "Products", exact: false })
        this.subscribeEmailInput = page.getByRole('textbox', { name: 'Your email address' })
        this.subscribeSubmitButton = page.locator('#subscribe');
        this.subscribtionSuccessLabel = page.locator('#success-subscribe')
    }

    async goto() {
        await this.page.goto("/")
        await this.clickConsent();
    }

    async clickSignupLoginButton() {
        await this.signupLoginButton.click();
    }
    async clickProductsButton() {
        await this.productsButton.click();
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/');
        await this.deleteAdsContainer()
    }

    async assertNavUsername(username: string) {
        await expect(this.page.getByText('Logged in as')).toContainText(username);
    }
    async subscribeWithEmail(email: string) {
        await this.subscribeEmailInput.fill(email);
        await this.subscribeSubmitButton.click();
    }
    async assertSuccessfullSubscribtion() {
        await expect(this.subscribtionSuccessLabel).toBeVisible();
        await expect(this.subscribtionSuccessLabel).toContainText('You have been successfully subscribed!');
    }
    async assertEmailInputEmpty() {
        await expect(this.subscribeEmailInput).toBeEmpty();
    }
}
