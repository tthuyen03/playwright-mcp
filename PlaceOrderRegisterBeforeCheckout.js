const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const SignupPage = require('./pages/SignupPage');
const CheckoutPage = require('./pages/CheckoutPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const checkoutPage = new CheckoutPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click 'Signup / Login' button
        await signupPage.clickSignupLogin();

        // 4. Fill all details in Signup and create account
        await signupPage.fillSignupDetails('Test User123', 'test123478@example.com');

        // 5. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await signupPage.verifyAccountCreated();

        // 6. Verify ' Logged in as username' at top
        await signupPage.verifyLoggedInAs('Test User');

        // 7. Add products to cart
        // This step would typically involve adding products to the cart, which is not shown here.

        // 8. Click 'Cart' button
        await checkoutPage.clickCartButton();

        // 9. Verify that cart page is displayed
        await checkoutPage.verifyCartPageDisplayed();

        // 10. Click Proceed To Checkout
        await checkoutPage.clickProceedToCheckout();

        // 11. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetailsAndReviewOrder();

        // 12. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterCommentAndPlaceOrder('Test order comment');

        // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await checkoutPage.enterPaymentDetails('Test Name', '1234567890123456', '123', '12/25');

        // 14. Click 'Pay and Confirm Order' button
        await checkoutPage.clickPayAndConfirmOrder();

        // 15. Verify success message 'Your order has been placed successfully!'
        await checkoutPage.verifyOrderPlacedSuccessfully();

        console.log('Test Case 15: Place Order: Register before Checkout - PASSED');
    } catch (error) {
        console.error('Test Case 15: Place Order: Register before Checkout - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 