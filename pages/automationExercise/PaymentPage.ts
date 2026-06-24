import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class PaymentPage extends BaseShopPage {
    readonly nameOnCardInput: Locator
    readonly cardNumberInput: Locator
    readonly cvcInput: Locator
    readonly expiryMonthInput: Locator
    readonly expiryYearInput: Locator
    readonly payButton: Locator
    constructor(readonly page: Page) {
        super(page);
        this.nameOnCardInput = page.getByTestId("name-on-card")
        this.cardNumberInput = page.getByTestId("card-number")
        this.cvcInput = page.getByTestId("cvc")
        this.expiryMonthInput = page.getByTestId("expiry-month")
        this.expiryYearInput = page.getByTestId("expiry-year")
        this.payButton = page.getByTestId("pay-button")
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL("/payment")
        await this.deleteAdsContainer()
    }
    async fillCardInfo(card: object) {
        await this.nameOnCardInput.fill(card.nameOnCard)
        await this.cardNumberInput.fill(card.cardNumber)
        await this.cvcInput.fill(card.cvc)
        await this.expiryMonthInput.fill(card.expiryMonth)
        await this.expiryYearInput.fill(card.expiryYear)
    }
    async clickPayButton() {
        await this.payButton.click();
    }
}