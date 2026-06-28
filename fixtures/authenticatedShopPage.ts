import { test as base, Page, request } from "@playwright/test";
import { generateUser } from "../utils/testData";
import { SignupLoginPage } from "../pages/automationExercise/SignupLoginPage";
import { AccountCreationPage } from "../pages/automationExercise/AccountCreationPage";
import { ShopApiClient } from "../utils/shopApiClient";
export type AuthenticatedPageFixture = {
    authenticatedShopPage: Page;
}

export const test = base.extend<AuthenticatedPageFixture>({
    authenticatedShopPage: [
        async ({ browser, request }, use) => {
            const user = generateUser();
            const page = await browser.newPage();
            const signupLoginPage = new SignupLoginPage(page)
            const accountCreationPage =  new AccountCreationPage(page)
            
            await signupLoginPage.goto();
            await signupLoginPage.fillSignupInputs(user.name, user.email)
            await signupLoginPage.clickSignup();

            await accountCreationPage.assertOnPage();
            await accountCreationPage.enterAccountInformation(
                user.title,
                user.password,
                user.birth_date,
                user.birth_month,
                user.birth_year,
                user.firstname,
                user.lastname,
                user.address1,
                user.country,
                user.state,
                user.city,
                user.zipcode,
                user.mobile_number
            )
            await accountCreationPage.clickCreateAccountButton();
            await accountCreationPage.assertOnAccountCreatedPage();
            
            await use(page); // test body runs here

            const apiClient = new ShopApiClient(request);
            await apiClient.deleteAccount(user.email, user.password);
            await page.close();
        },
        { timeout: 60_000 }
    ],
})

