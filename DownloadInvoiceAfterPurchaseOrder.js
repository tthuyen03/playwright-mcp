const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');
const CartPage = require('./pages/CartPage');
const CheckoutPage = require('./pages/CheckoutPage');
const SignupPage = require('./pages/SignupPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 24: Download Invoice after purchase order');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SignupPage(page);

    try {
        // 1. Launch browser
        logger.info('Step 1: Browser launched successfully');

        // 2. Navigate to url 'http://automationexercise.com'
        logger.info('Step 2: Navigating to automationexercise.com');
        await homePage.navigate();

        // 3. Verify that home page is visible successfully
        logger.info('Step 3: Verifying home page visibility');
        await homePage.verifyHomePageVisible();

        // 4. Add products to cart
        logger.info('Step 4: Adding products to cart');
        await productsPage.clickProductsButton();
        await productsPage.hoverAndAddToCart(productsPage.firstProduct);
        await productsPage.clickContinueShopping();
        await productsPage.hoverAndAddToCart(productsPage.secondProduct);

        // 5. Click 'Cart' button
        logger.info('Step 5: Clicking Cart button');
        await cartPage.clickCartButton();

        // 6. Verify that cart page is displayed
        logger.info('Step 6: Verifying cart page display');
        await cartPage.verifyCartPageDisplayed();

        // 7. Click Proceed To Checkout
        logger.info('Step 7: Clicking Proceed To Checkout');
        await checkoutPage.clickProceedToCheckout();

        // 8. Click 'Register / Login' button
        logger.info('Step 8: Clicking Register/Login button');
        await checkoutPage.clickRegisterLogin();

        // 9. Fill all details in Signup and create account
        logger.info('Step 9: Filling signup details');
        const userDetails = {
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

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        logger.info('Step 10: Verifying account creation');
        await signupPage.verifyAccountCreated();

        // 11. Verify ' Logged in as username' at top
        logger.info('Step 11: Verifying logged in status');
        await homePage.verifyLoggedInAs(userDetails.name);

        // 12. Click 'Cart' button
        logger.info('Step 12: Clicking Cart button');
        await cartPage.clickCartButton();

        // 13. Click 'Proceed To Checkout' button
        logger.info('Step 13: Clicking Proceed To Checkout');
        await checkoutPage.clickProceedToCheckout();

        // 14. Verify Address Details and Review Your Order
        logger.info('Step 14: Verifying address details and order review');
        await checkoutPage.verifyAddressDetails();
        await checkoutPage.verifyOrderReview();

        // 15. Enter description in comment text area and click 'Place Order'
        logger.info('Step 15: Entering comment and placing order');
        await checkoutPage.enterComment('Please deliver in the morning');
        await checkoutPage.clickPlaceOrder();

        // 16. Enter payment details
        logger.info('Step 16: Entering payment details');
        const paymentDetails = {
            nameOnCard: 'Test User',
            cardNumber: '4111111111111111',
            cvc: '123',
            expiryMonth: '12',
            expiryYear: '2025'
        };
        await checkoutPage.enterPaymentDetails(paymentDetails);

        // 17. Click 'Pay and Confirm Order' button
        logger.info('Step 17: Clicking Pay and Confirm Order');
        await checkoutPage.clickPayAndConfirm();

        // 18. Verify success message
        logger.info('Step 18: Verifying order success message');
        await checkoutPage.verifyOrderSuccess();

        // 19. Click 'Download Invoice' button and verify invoice is downloaded
        logger.info('Step 19: Downloading invoice');
        await checkoutPage.downloadInvoice();

        // 20. Click 'Continue' button
        logger.info('Step 20: Clicking Continue button');
        await checkoutPage.clickContinue();

        // 21. Click 'Delete Account' button
        logger.info('Step 21: Clicking Delete Account button');
        await homePage.clickDeleteAccountButton();

        // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        logger.info('Step 22: Verifying account deletion');
        await signupPage.verifyAccountDeleted();

        logger.info('Test Case 24: Download Invoice after purchase order - PASSED');
    } catch (error) {
        logger.error('Test Case 24: Download Invoice after purchase order - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})();
