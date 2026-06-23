import { expect, Page } from "@playwright/test";

export class BaseShopPage {

    constructor(readonly page: Page) {
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        
    }
}