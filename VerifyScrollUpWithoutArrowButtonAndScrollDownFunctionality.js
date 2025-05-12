const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ScrollPage = require('./pages/ScrollPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const scrollPage = new ScrollPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Scroll down page to bottom
        await scrollPage.scrollToBottom();

        // 4. Verify 'SUBSCRIPTION' is visible
        await scrollPage.verifySubscriptionVisible();

        // 5. Click on arrow at bottom right side to move upward
        await scrollPage.clickScrollUpArrow();

        // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await scrollPage.verifyFullFledgedTextVisible();

        console.log('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality - PASSED');
    } catch (error) {
        console.error('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 