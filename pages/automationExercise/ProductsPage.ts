import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ProductsPage extends BaseShopPage {
    readonly productBanner: Locator

    readonly modalViewCartButton:Locator

    constructor(readonly page: Page) {
        super(page);
        this.productBanner = page.locator(".single-products")
        this.modalViewCartButton = page.getByRole('link', {name: "View cart"})
    }

    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/products');
        await this.deleteAdsContainer()
    }

    async getNthProduct(nth: number) {
        return this.productBanner.nth(nth);
    }
    async getFirstProduct() {
        return await this.getNthProduct(0)
    }
    async getLastProduct() {
        return this.productBanner.last()
    }
    async clickProductsPopUpAddToCartButton(product: Locator) {
        const addToCartPopUpButton = product.locator(".product-overlay .add-to-cart")

        await addToCartPopUpButton.scrollIntoViewIfNeeded();
        await this.deleteAdsContainer();
        await addToCartPopUpButton.click();
    }
    async clickModalViewCartButton() {
        await this.modalViewCartButton.click();
    }
}
