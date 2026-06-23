import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class PaymentPage extends BaseShopPage {
    
    constructor(readonly page: Page) {
        super(page);
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        
    }
}