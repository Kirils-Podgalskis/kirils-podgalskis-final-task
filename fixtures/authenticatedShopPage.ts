import { test as base, Page } from "@playwright/test";
import { generateUser } from "../utils/testData";


export type AuthenticatedPageFixture = {
    authenticatedShopPage: Page;
}

export const test = base.extend<AuthenticatedPageFixture>({
    authenticatedShopPage: [
        async ({ browser }, use) => {
            const user = generateUser();
            const page = await browser.newPage();
            //TODO: register user
            await use(page); // test body runs here

            await page.close();
        },
        { timeout: 60_000 }
    ],
})

