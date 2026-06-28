import { test as base, Page } from "@playwright/test";
import { generateUser } from "../utils/testData";
import { SignupLoginPage } from "../pages/automationExercise/SignupLoginPage";
import { AccountCreationPage } from "../pages/automationExercise/AccountCreationPage";
export type AuthenticatedPageFixture = {
    authenticatedShopPage: Page;
}

export const test = base.extend<AuthenticatedPageFixture>({
    authenticatedShopPage: [
        async ({ browser }, use) => {
            const user = generateUser();
            const page = await browser.newPage();
            const signupLoginPage = new SignupLoginPage(page)
            const accountCreationPage =  new AccountCreationPage(page)
            
            await signupLoginPage.goto();
            await signupLoginPage.fillSignupInputs(user.username, user.email)
            await signupLoginPage.clickSignup();

            await accountCreationPage.assertOnPage();
            await accountCreationPage.enterAccountInformation(
                user.title,
                user.password,
                user.day,
                user.month,
                user.year,
                user.firstName,
                user.lastName,
                user.address,
                user.country,
                user.state,
                user.city,
                user.zipcode,
                user.phone
            )
            await accountCreationPage.clickCreateAccountButton();
            await accountCreationPage.assertOnAccountCreatedPage();
            await use(page); // test body runs here

            await page.close();
        },
        { timeout: 60_000 }
    ],
})

