import { expect, Locator, Page } from "@playwright/test";
import { BaseShopPage } from "./BaseShopPage";

export class CheckoutPage extends BaseShopPage {
    readonly deliveryContainer: Locator
    readonly deliveryCompanyLabel: Locator
    readonly deliveryAddressLabel: Locator
    readonly deliveryAddressTwoLabel: Locator
    readonly deliveryCityStateZipcodeLabel: Locator
    readonly deliveryCountryNameLabel: Locator

    readonly placeOrderButton: Locator

    constructor(readonly page: Page) {
        super(page);
        this.deliveryContainer = page.locator("#address_delivery")
        this.deliveryCompanyLabel = this.deliveryContainer.locator(".address_address1").nth(0)
        this.deliveryAddressLabel = this.deliveryContainer.locator(".address_address1").nth(1)
        this.deliveryAddressTwoLabel = this.deliveryContainer.locator(".address_address1").nth(2)
        this.deliveryCityStateZipcodeLabel = this.deliveryContainer.locator(".address_city")
        this.deliveryCountryNameLabel = this.deliveryContainer.locator(".address_country_name")
        this.placeOrderButton = page.getByRole('link', {name: "Place Order"})
    }
    
    async assertOnPage(options?: { timeout?: number }) {
        await expect(this.page).toHaveURL('/checkout');
        await this.deleteAdsContainer()
    }

    async assertDeliveryAddress(
        company:string,
        address: string,
        addressTwo: string,
        city: string,
        state: string,
        zipcode: string,
        country: string
    ) {
        await expect(this.deliveryCompanyLabel).toContainText(company)
        await expect(this.deliveryAddressLabel).toContainText(address)
        await expect(this.deliveryAddressTwoLabel).toContainText(addressTwo)
        await expect(this.deliveryCityStateZipcodeLabel).toContainText(city)
        await expect(this.deliveryCityStateZipcodeLabel).toContainText(state)
        await expect(this.deliveryCityStateZipcodeLabel).toContainText(zipcode)
        await expect(this.deliveryCountryNameLabel).toContainText(country)
    }
    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}