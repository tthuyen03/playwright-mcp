const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ScrollPage = require('./pages/ScrollPage');
const ScreenshotUtil = require('./utils/screenshot');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const scrollPage = new ScrollPage(page);
    const screenshotUtil = new ScreenshotUtil(page);

    try {
        // 1. Launch browser and navigate to url
        logger.info('Step 1: Launching browser and navigating to URL');
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        logger.info('Step 2: Verifying home page visibility');
        await homePage.verifyHomePageVisible();
        await screenshotUtil.takeScreenshot('homepage_verification');
        logger.info('Home page is visible');

        // 3. Scroll down page to bottom
        logger.info('Step 3: Scrolling page to bottom');
        await scrollPage.scrollToBottom();
        logger.info('Page scrolled to bottom successfully');

        // 4. Verify 'SUBSCRIPTION' is visible
        logger.info('Step 4: Verifying subscription visibility');
        await scrollPage.verifySubscriptionVisible();
        await screenshotUtil.takeScreenshot('subscription_verification');
        logger.info('Subscription is visible');

        // 5. Click on arrow at bottom right side to move upward
        logger.info('Step 5: Clicking scroll up arrow');
        await scrollPage.clickScrollUpArrow();
        logger.info('Scroll up arrow clicked successfully');

        // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        logger.info('Step 6: Verifying full-fledged text visibility');
        await scrollPage.verifyFullFledgedTextVisible();
        await screenshotUtil.takeScreenshot('fullfledged_text_verification');
        logger.info('Full-fledged text is visible');

        logger.info('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality - PASSED');
    } catch (error) {
        logger.error('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality - FAILED');
        logger.error(`Error details: ${error.message}`);
        await screenshotUtil.takeScreenshot('test_failed');
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})(); 