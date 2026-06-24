import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class ProductsPage extends BaseShopPage {
    readonly searchProductInput: Locator
    readonly submitSearchButton: Locator
    readonly searchedProductsHeading: Locator
    readonly productBanner: Locator
    readonly modalViewCartButton:Locator
    readonly modalContinueShoppingButton:Locator

    constructor(readonly page: Page) {
        super(page);
        this.searchProductInput = page.getByRole('textbox', {name:"Search Product"})
        this.submitSearchButton = page.locator("#submit_search")
        this.searchedProductsHeading = page.getByRole('heading', {name:"Searched Products"})
        this.productBanner = page.locator(".product-image-wrapper")
        this.modalViewCartButton = page.getByRole('link', {name: "View cart"})
        this.modalContinueShoppingButton = page.getByRole('button', {name:"Continue Shopping"})
    }
    async goto() {
        await this.page.goto("/products")
        await this.clickConsent();
    }
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/products');
        await this.deleteAdsContainer()
    }

    async getNthProduct(nth: number) {
        return this.productBanner.nth(nth-1);
    }
    async getFirstProduct() {
        return await this.getNthProduct(1)
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
    async clickModalContinueShoppingButton() {
        await this.modalContinueShoppingButton.click();
    }
    async enterSearchQuery(query:string) {
        await this.searchProductInput.fill(query)
    }
    async submitSearch() {
        await this.submitSearchButton.click();
    } 
    async assertSearchedProductsHeadingVisible() {
        await expect(this.searchedProductsHeading).toBeVisible();
    }

    async assertAtLeastNProductsVisible(n:number) {
        await expect(this.productBanner.nth(n-1)).toBeVisible();
    }

    async assertAllProductsContainText(text:string) {
        (await this.productBanner.all()).forEach(element => {
            expect(element).toContainText(text, {ignoreCase:true, useInnerText:true})
        });
    }

    async getProductData(product:Locator) {
        const productPrice = await product.locator(".productinfo").getByRole('heading').textContent()
        const productName = await product.locator(".productinfo").getByRole('paragraph').textContent()
        if (!productPrice) {
            throw new Error("Price not found!");
        }
        if (!productName) {
            throw new Error("Name not found!");
        }
        return {
            productPrice: productPrice,
            productName: productName
        }
    }

    async clickViewProduct(product:Locator) {
        await product.getByRole('link', { name: "View product"}).click()
    }
}
