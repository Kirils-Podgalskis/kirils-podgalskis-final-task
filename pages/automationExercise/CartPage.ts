import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class CartPage extends BaseShopPage {
    readonly proceedToCheckoutButton: Locator
    constructor(readonly page: Page) {
        super(page);
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout')
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/view_cart');
        await this.deleteAdsContainer()
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}