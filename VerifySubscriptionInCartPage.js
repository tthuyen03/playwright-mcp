const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const CartPage = require('./pages/CartPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click 'Cart' button
        await cartPage.clickCartButton();

        // 4. Scroll down to footer
        await cartPage.scrollToFooter();

        // 5. Verify text 'SUBSCRIPTION'
        await cartPage.verifySubscriptionTextVisible();

        // 6. Enter email address in input and click arrow button
        await cartPage.enterEmailForSubscription('test@example.com');

        // 7. Verify success message 'You have been successfully subscribed!' is visible
        await cartPage.verifySubscriptionSuccessMessageVisible();

        console.log('Test Case 11: Verify Subscription in Cart page - PASSED');
    } catch (error) {
        console.error('Test Case 11: Verify Subscription in Cart page - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 