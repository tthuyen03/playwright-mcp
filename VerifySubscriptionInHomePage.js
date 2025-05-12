const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);

    // Test data
    const email = 'testuser@example.com';

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Scroll down to footer
        await homePage.scrollToFooter();

        // 4. Verify text 'SUBSCRIPTION'
        await homePage.verifySubscriptionTextVisible();

        // 5. Enter email address in input and click arrow button
        await homePage.enterEmailForSubscription(email);

        // 6. Verify success message 'You have been successfully subscribed!' is visible
        await homePage.verifySubscriptionSuccessMessageVisible();

        console.log('Test Case 10: Verify Subscription in home page - PASSED');
    } catch (error) {
        console.error('Test Case 10: Verify Subscription in home page - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 