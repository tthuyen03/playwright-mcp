const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const LoginPage = require('./pages/LoginPage');
const CheckoutPage = require('./pages/CheckoutPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click 'Signup / Login' button
        await loginPage.clickSignupLogin();

        // 4. Fill email, password and click 'Login' button
        await loginPage.fillLoginDetails('testuser12378@gmail.com', 'Thanh123@');

        // 5. Verify 'Logged in as username' at top
        await loginPage.verifyLoggedInAs('Test User');

        // 6. Add products to cart
        // This step would typically involve adding products to the cart, which is not shown here.

        // 7. Click 'Cart' button
        await checkoutPage.clickCartButton();

        // 8. Verify that cart page is displayed
        await checkoutPage.verifyCartPageDisplayed();

        // 9. Click Proceed To Checkout
        await checkoutPage.clickProceedToCheckout();

        // 10. Verify Address Details and Review Your Order
        await checkoutPage.verifyAddressDetailsAndReviewOrder();

        // 11. Enter description in comment text area and click 'Place Order'
        await checkoutPage.enterCommentAndPlaceOrder('Test order comment');

        // 12. Enter payment details: Name on Card, Card Number, CVC, Expiration date
        await checkoutPage.enterPaymentDetails('Test Name', '1234567890123456', '123', '12/25');

        // 13. Click 'Pay and Confirm Order' button
        await checkoutPage.clickPayAndConfirmOrder();

        // 14. Verify success message 'Your order has been placed successfully!'
        await checkoutPage.verifyOrderPlacedSuccessfully();

        console.log('Test Case 16: Place Order: Login before Checkout - PASSED');
    } catch (error) {
        console.error('Test Case 16: Place Order: Login before Checkout - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 