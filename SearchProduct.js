const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 9: Search Product');
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

        // Wait for 2 seconds before proceeding
        await page.waitForTimeout(2000);

        // 3. Verify that home page is visible successfully
        logger.info('Step 3: Verifying home page visibility');
        await homePage.verifyHomePageVisible();

        // Wait for 1 second before proceeding
        await page.waitForTimeout(1000);

        // 4. Click on 'Products' button
        logger.info('Step 4: Clicking on Products button');
        await productsPage.clickProductsButton();

        // Wait for 1 second before proceeding
        await page.waitForTimeout(1000);

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        logger.info('Step 5: Verifying navigation to ALL PRODUCTS page');
        await productsPage.verifyAllProductsPage();

        // Wait for 1 second before proceeding
        await page.waitForTimeout(1000);

        // 6. Enter product name in search input and click search button
        logger.info('Step 6: Searching for product');
        await productsPage.searchProduct('Blue Top');

        // Wait for 2 seconds before proceeding
        await page.waitForTimeout(2000);

        // 7. Verify 'SEARCHED PRODUCTS' is visible
        logger.info('Step 7: Verifying SEARCHED PRODUCTS visibility');
        await productsPage.verifySearchedProducts();

        // Wait for 1 second before proceeding
        await page.waitForTimeout(1000);

        // 8. Verify all the products related to search are visible
        logger.info('Step 8: Verifying searched products list');
        await productsPage.verifySearchedProductsList();

        logger.info('Test Case 9: Search Product - PASSED');
    } catch (error) {
        logger.error('Test Case 9: Search Product - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})();
