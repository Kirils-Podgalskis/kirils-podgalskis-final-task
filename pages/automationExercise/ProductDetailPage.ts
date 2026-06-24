import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ProductDetailPage extends BaseShopPage {

    readonly productInformationContainer: Locator
    readonly productNameHeading: Locator
    readonly addToCartButton: Locator
    
    constructor(readonly page: Page) {
        super(page);
        this.productInformationContainer = page.locator(".product-information")
        this.productNameHeading = this.productInformationContainer.getByRole('heading')
        this.addToCartButton = this.productInformationContainer.getByRole('button', {name:/Add to cart/i})
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL(/\/product_details\//)
        await this.deleteAdsContainer()
    }
    async assertProductInformationPresent() {
        await expect(this.productNameHeading).toBeVisible();
        await expect(this.productNameHeading).toContainText(/\S/)
        await expect(this.productInformationContainer).toContainText(/Category: .+/i)
        await expect(this.productInformationContainer).toContainText(/Rs\.\s?[0-9]+/i)

        const availability = (
                await this.productInformationContainer.locator('p').filter({ hasText: 'Availability:' }).textContent()
            )?.split("Availability:")[1]
        console.log(`Availability has value "${availability}"`)
        expect(availability?.trim().length).toBeGreaterThanOrEqual(1)

        const condition = (
                await this.productInformationContainer.locator('p').filter({ hasText: 'Condition:' }).textContent()
            )?.split("Condition:")[1]
        console.log(`Condition has value "${condition}"`)
        expect(condition?.trim().length).toBeGreaterThanOrEqual(1)

        const brand = (
                await this.productInformationContainer.locator('p').filter({ hasText: 'Brand:' }).textContent()
            )?.split("Brand:")[1]
        console.log(`Brand has value "${brand}"`)
        expect(brand?.trim().length).toBeGreaterThanOrEqual(1)
    }
    async assertAddToCardButtonPresent(){
        await expect(this.addToCartButton).toBeVisible()
    }
}