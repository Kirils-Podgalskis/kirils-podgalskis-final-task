import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class CartPage extends BaseShopPage {
    readonly proceedToCheckoutButton: Locator

    readonly cartRows: Locator
    constructor(readonly page: Page) {
        super(page);
        this.proceedToCheckoutButton = page.getByText('Proceed To Checkout')
        this.cartRows = page.locator("tbody > tr")
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/view_cart');
        await this.deleteAdsContainer()
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
    async assertCartRowsCount(expectedCount:number) {
        await expect(this.cartRows).toHaveCount(expectedCount)
    }
    async assertCartRowsData(rowsData: { productPrice: string ; productName: string ;}[]){
        for (let index = 0; index < rowsData.length; index++) {
            await expect(
                this.cartRows.nth(index).locator(".cart_description")
            ).toContainText(rowsData[index].productName)

            await expect(
                this.cartRows.nth(index).locator(".cart_price")
            ).toContainText(rowsData[index].productPrice)

            await expect(
                this.cartRows.nth(index).locator(".cart_quantity")
            ).toContainText("1")
            await expect(
                this.cartRows.nth(index).locator(".cart_total")
            ).toContainText(rowsData[index].productPrice)
            

        }
    }
}