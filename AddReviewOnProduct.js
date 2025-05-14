const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 21: Add review on product');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    try {
        // 1. Launch browser
        logger.info('Step 1: Browser launched successfully');

        // 2. Navigate to url 'http://automationexercise.com'
        logger.info('Step 2: Navigating to automationexercise.com');
        await homePage.navigate();

        // 3. Click on 'Products' button
        logger.info('Step 3: Clicking Products button');
        await productsPage.clickProductsButton();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        logger.info('Step 4: Verifying ALL PRODUCTS page');
        await productsPage.verifyAllProductsPage();

        // 5. Click on 'View Product' button
        logger.info('Step 5: Clicking View Product button');
        await productsPage.clickViewProductOfFirstProduct();

        // 6. Verify 'Write Your Review' is visible
        logger.info('Step 6: Verifying Write Your Review section');
        await productsPage.verifyWriteReviewVisible();

        // 7. Enter name, email and review
        logger.info('Step 7: Entering review details');
        const reviewDetails = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            review: 'This is a great product! The quality is excellent and it works perfectly. I would definitely recommend it to others.'
        };
        await productsPage.submitReview(reviewDetails);

        // 8. Click 'Submit' button
        // Note: Submit button click is included in the submitReview method

        // 9. Verify success message 'Thank you for your review.'
        logger.info('Step 9: Verifying review submission success');
        await productsPage.verifyReviewSuccess();

        logger.info('Test Case 21: Add review on product - PASSED');
    } catch (error) {
        logger.error('Test Case 21: Add review on product - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})();
