const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const SignupPage = require('./pages/SignupPage');
const ProductsPage = require('./pages/ProductsPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 23: Verify address details in checkout page');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    try {
        // 1. Launch browser
        logger.info('Step 1: Browser launched successfully');

        // 2. Navigate to url 'http://automationexercise.com'
        logger.info('Step 2: Navigating to automationexercise.com');
        await homePage.navigate();

        // 3. Verify that home page is visible successfully
        logger.info('Step 3: Verifying home page visibility');
        await homePage.verifyHomePageVisible();

        // 4. Click 'Signup / Login' button
        logger.info('Step 4: Clicking Signup/Login button');
        await homePage.clickSignupLogin();

        // 5. Fill all details in Signup and create account
        logger.info('Step 5: Filling signup details');
        const userDetails = {
            title: 'Mr.',
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'Test@123',
            firstName: 'Test',
            lastName: 'User',
            company: 'Test Company',
            address1: '123 Test Street',
            address2: 'Apt 4B',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };
        await signupPage.signup(userDetails);
        

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        logger.info('Step 6: Verifying account creation');
        await signupPage.verifyAccountCreated();

        // 7. Verify ' Logged in as username' at top
        logger.info('Step 7: Verifying logged in status');
        await homePage.verifyLoggedInAs(userDetails.name);

        // 8. Add products to cart
        logger.info('Step 8: Adding products to cart');
        await productsPage.clickProductsButton();
        await productsPage.hoverAndAddToCartByName('Blue Top');
        await productsPage.clickContinueShopping();
        await productsPage.hoverAndAddToCartByName('Sleeveless Dress');

        // 9. Click 'Cart' button
        logger.info('Step 9: Clicking Cart button');
        await cartPage.clickCartButton();

        // 10. Verify that cart page is displayed
        logger.info('Step 10: Verifying cart page');
        await cartPage.verifyCartPageDisplayed();

        // 11. Click Proceed To Checkout
        logger.info('Step 11: Proceeding to checkout');
        await checkoutPage.clickProceedToCheckout();

        // 12. Verify that the delivery address is same address filled at the time registration of account
        logger.info('Step 12: Verifying delivery address');
        const expectedAddress = `${userDetails.firstName} ${userDetails.lastName}\n${userDetails.company}\n${userDetails.address1}\n${userDetails.address2}\n${userDetails.city} ${userDetails.state} ${userDetails.zipcode}\n${userDetails.country}\n${userDetails.mobileNumber}`;
        await checkoutPage.verifyAddress(expectedAddress);

        // 13. Verify that the billing address is same address filled at the time registration of account
        logger.info('Step 13: Verifying billing address');
        await checkoutPage.verifyAddress(expectedAddress);

        // 14. Click 'Delete Account' button
        logger.info('Step 14: Deleting account');
        await homePage.clickDeleteAccountButton();

        // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        logger.info('Step 15: Verifying account deletion');
        await signupPage.verifyAccountDeleted();

        logger.info('Test Case 23: Verify address details in checkout page - PASSED');
    } catch (error) {
        logger.error('Test Case 23: Verify address details in checkout page - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})(); 