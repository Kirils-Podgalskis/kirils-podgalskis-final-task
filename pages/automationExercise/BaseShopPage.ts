import { expect, Locator, Page } from "@playwright/test";

export class BaseShopPage {
    readonly consentCookie: Locator
    readonly googleAddsContainer: Locator
    constructor(readonly page: Page) {

        this.consentCookie = page.getByRole("button", {name: "Consent"})
        this.googleAddsContainer = page.locator(".adsbygoogle");
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await this.deleteAdsContainer()
    }

    async clickConsent() {
        const visible = await this.consentCookie.isVisible();
        if(visible) {
            await this.consentCookie.click();
        }
    }
    async deleteAdsContainer() {
        await this.page.evaluate(() => {
            document.querySelectorAll(".adsbygoogle").forEach(el => el.remove());
        });
    }
}