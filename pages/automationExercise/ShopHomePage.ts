import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ShopHomePage extends BaseShopPage {
    
    constructor(readonly page: Page) {
        super(page);
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        
    }
}
