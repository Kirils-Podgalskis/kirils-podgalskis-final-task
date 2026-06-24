import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ShopHomePage extends BaseShopPage {
    readonly signupLoginButton: Locator;
    readonly productsButton: Locator
    constructor(readonly page: Page) {
        super(page);

        this.signupLoginButton = page.getByRole('link', { name: "Signup / Login", exact: false })
        this.productsButton = page.getByRole('link', { name: "Products", exact: false })
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
}
