import { test as base, Page } from "@playwright/test";
import { test } from "../fixtures/authenticatedShopPage.ts";
import { ShopApiClient } from "../utils/shopApiClient.ts";
import {
	epic,
	feature,
	story,
	severity,
	label,
	description,
	Severity,
} from "allure-js-commons";
import { generateUser } from "../utils/testData.ts";

import { ShopHomePage } from "../pages/automationExercise/ShopHomePage.ts";
import { SignupLoginPage } from "../pages/automationExercise/SignupLoginPage.ts";
import { AccountCreationPage } from "../pages/automationExercise/AccountCreationPage.ts";
import { ProductsPage } from "../pages/automationExercise/ProductsPage.ts";
import { CartPage } from "../pages/automationExercise/CartPage.ts";
import { CheckoutPage } from "../pages/automationExercise/CheckoutPage.ts";
import { PaymentPage } from "../pages/automationExercise/PaymentPage.ts";
import { PaymentConfirmationPage } from "../pages/automationExercise/PaymentConfirmationPage.ts";
import { ProductDetailPage } from "../pages/automationExercise/ProductDetailPage.ts";



test.describe("Shopping", () => {
	test(
		"TC-SHOP-001 — Happy path: full shopping flow (register -> browse -> checkout)",
		{
			tag: ["@shopping", "@checkout", "@p1"],
		},
		async ({ page }) => {
			await epic("Shopping");
			await feature("Checkout");
			await story("Full E2E flow");
			await severity(Severity.CRITICAL);
			await label("priority", "P1");
			await label("layer", "ui");
			await description(
				"A new user can register, add a product to the cart, and complete a full checkout.",
			);
            const shopHomePage = new ShopHomePage(page);
            const signupLoginPage = new SignupLoginPage(page);
            const accountCreationPage = new AccountCreationPage(page);
            const productsPage = new ProductsPage(page);
            const cartPage = new CartPage(page)
            const checkoutPage = new CheckoutPage(page)
            const paymentPage = new PaymentPage(page)
            const paymentConfirmationPage = new PaymentConfirmationPage(page)



            const newUser = generateUser();
            
            await shopHomePage.goto();
            await shopHomePage.clickConsent();
            await shopHomePage.clickSignupLoginButton();

            await signupLoginPage.assertOnPage();
            await signupLoginPage.fillSignupInputs(newUser.username, newUser.email);
            await signupLoginPage.clickSignup();

            await accountCreationPage.assertOnPage();
            await accountCreationPage.enterAccountInformation(
                newUser.title,
                newUser.password,
                newUser.day,
                newUser.month,
                newUser.year,
                newUser.firstName,
                newUser.lastName,
                newUser.address,
                newUser.country,
                newUser.state,
                newUser.city,
                newUser.zipcode,
                newUser.phone
            )
            await accountCreationPage.clickCreateAccountButton();
            await accountCreationPage.assertOnAccountCreatedPage();

            await accountCreationPage.clickContinue();
            await shopHomePage.assertNavUsername(newUser.username)

            await shopHomePage.clickProductsButton();
            await productsPage.assertOnPage();

            const firstProduct = await productsPage.getFirstProduct();
            await firstProduct.hover();
            await productsPage.clickProductsPopUpAddToCartButton(firstProduct);
            await productsPage.clickModalViewCartButton();
            await cartPage.assertOnPage();

            await cartPage.clickProceedToCheckout();
            await checkoutPage.assertOnPage();

            await checkoutPage.assertDeliveryAddress(
                "",
                newUser.address,
                "",
                newUser.city,
                newUser.state,
                newUser.zipcode,
                newUser.country
            )

            await checkoutPage.clickPlaceOrder();
            await paymentPage.fillCardInfo(newUser.card);
            await paymentPage.clickPayButton();

            await paymentConfirmationPage.assertOnPage();
            await paymentConfirmationPage.assertIsOrderPlaced();
		},
	);

	test(
		"TC-SHOP-002 — Search: keyword search returns only matching products",
		{
			tag: ["@shopping", "@search", "@p1"],
		},
		async ({ page }) => {
			await epic("Shopping");
			await feature("Product Search");
			await story("Keyword search");
			await severity(Severity.NORMAL);
			await label("priority", "P1");
			await label("layer", "ui");
			await description(
				"Searching for a product keyword filters the product list to matching items only.",
			);

            const productsPage = new ProductsPage(page);

			const query = "dress"
			await productsPage.goto();
			await productsPage.enterSearchQuery(query);
			await productsPage.submitSearch();
			await productsPage.assertAtLeastNProductsVisible(1);
			await productsPage.assertSearchedProductsHeadingVisible();
			await productsPage.assertAllProductsContainText(query)
		},
	);

	test(
		"TC-SHOP-003 — Cart: adding multiple products updates the item count",
		{
			tag: ["@shopping", "@cart", "@p1"],
		},
		async ({ page }) => {
			await epic("Shopping");
			await feature("Cart");
			await story("Add multiple products");
			await severity(Severity.NORMAL);
			await label("priority", "P1");
			await label("layer", "ui");
			await description(
				"Adding two different products to the cart results in both items appearing in the cart.",
			);

			const productsPage = new ProductsPage(page);
			const cartPage = new CartPage(page);

			await productsPage.goto();
			await productsPage.assertOnPage();

            const firstProductElement = await productsPage.getFirstProduct();
			const firstProductData = await productsPage.getProductData(firstProductElement);
            await firstProductElement.hover();
			
            await productsPage.clickProductsPopUpAddToCartButton(firstProductElement);
            await productsPage.clickModalContinueShoppingButton();
			
			const secondProductElement = await productsPage.getNthProduct(2);
			const secondProductData = await productsPage.getProductData(secondProductElement);

			await secondProductElement.hover();
            await productsPage.clickProductsPopUpAddToCartButton(secondProductElement);
            await productsPage.clickModalViewCartButton();

            await cartPage.assertOnPage();
			await cartPage.assertCartRowsCount(2);
			await cartPage.assertCartRowsData([firstProductData, secondProductData])
		},
	);

	test(
		"TC-SHOP-004 — Cart: removing a product updates the cart",
		{
			tag: ["@shopping", "@cart", "@p1"],
		},
		async ({ page }) => {
			await epic("Shopping");
			await feature("Cart");
			await story("Remove product");
			await severity(Severity.NORMAL);
			await label("priority", "P1");
			await label("layer", "ui");
			await description(
				"Deleting an item from the cart removes it from the product table.",
			);

			// test implementation
		},
	);

	test(
		"TC-SHOP-005 — Product detail: product information page shows correct data",
		{
			tag: ["@shopping", "@product-detail", "@p2"],
		},
		async ({ page }) => {
			await epic("Shopping");
			await feature("Product Detail");
			await story("View product info");
			await severity(Severity.MINOR);
			await label("priority", "P2");
			await label("layer", "ui");
			await description(
				"Opening a product detail page displays all expected product information.",
			);

			const productsPage = new ProductsPage(page);
			const productDetailPage = new ProductDetailPage(page)

			await productsPage.goto();
			const firstProductElement = await productsPage.getFirstProduct();
			await productsPage.clickViewProduct(firstProductElement);

			await productDetailPage.assertOnPage();
			await productDetailPage.assertProductInformationPresent();
			await productDetailPage.assertAddToCardButtonPresent();
			
		},
	);
});

test.describe("Products API", () => {
	let apiClient: ShopApiClient;

	test.beforeEach(async ({ request }) => {
		apiClient = new ShopApiClient(request);
	});

	test(
		"TC-SHOP-006 — API: GET /api/productsList returns a valid product list",
		{
			tag: ["@api", "@products", "@p1"],
		},
		async () => {
			await epic("API");
			await feature("Products API");
			await story("List all products");
			await severity(Severity.CRITICAL);
			await label("priority", "P1");
			await label("layer", "api");
			await description(
				"Products endpoint returns a non-empty collection of valid products.",
			);

			// test implementation
		},
	);

	test(
		"TC-SHOP-007 — API: POST /api/searchProduct returns matching results",
		{
			tag: ["@api", "@products", "@p1"],
		},
		async () => {
			await epic("API");
			await feature("Products API");
			await story("Search products");
			await severity(Severity.NORMAL);
			await label("priority", "P1");
			await label("layer", "api");
			await description(
				"Searching products via API returns matching results.",
			);

			// test implementation
		},
	);

	test(
		"TC-SHOP-008 — API: POST /api/searchProduct with missign parameter returns 400",
		{
			tag: ["@api", "@products", "@p2"],
		},
		async ({ request }) => {
			await epic("API");
			await feature("Products API");
			await story("Missign parameter");
			await severity(Severity.MINOR);
			await label("priority", "P2");
			await label("layer", "api");
			await description(
				"Search endpoint returns 400 when required parameter is missign.",
			);

			// test implementation
		},
	);
});

test.describe("Marketing", () => {
	test(
		"TC-SHOP-009 — Subscription: subscribing from the footer shows a success message",
		{
			tag: ["@marketing", "@newsletter", "@p2"],
		},
		async ({ page }) => {
			await epic("Marketing");
			await feature("Newsletter");
			await story("Footer subscription");
			await severity(Severity.MINOR);
			await label("priority", "P2");
			await label("layer", "ui");
			await description(
				"A visitor can subscribe to the newsletter from the footer.",
			);

			// test implementation
		},
	);
});

test.describe("Authentication", () => {
	test(
		"TC-SHOP-010 — Session: authenticated user is redirected away from the login page",
		{
			tag: ["@auth", "@session", "@p2"],
		},
		async ({ authenticatedShopPage }) => {
			await epic("Auth");
			await feature("Session");
			await story("Redirect logged-in user");
			await severity(Severity.MINOR);
			await label("priority", "P2");
			await label("layer", "ui");
			await description(
				"Authenticated users cannot access the login page.",
			);

			const page = authenticatedShopPage;

			// test implementation
		},
	);
});
