import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class PaymentConfirmationPage extends BaseShopPage {
    readonly orderPlacedLabel: Locator
    constructor(readonly page: Page) {
        super(page);
        this.orderPlacedLabel = page.getByTestId("order-placed")
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL(/\/payment_done\//)
        await this.deleteAdsContainer()
    }
    async assertIsOrderPlaced() {
        await expect(this.orderPlacedLabel).toBeVisible();
    }
}