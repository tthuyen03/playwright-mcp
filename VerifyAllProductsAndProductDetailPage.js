const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');
const ProductDetailPage = require('./pages/ProductDetailPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 8: Verify All Products and product detail page');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    try {
        // 1. Launch browser
        logger.info('Step 1: Browser launched successfully');

        // 2. Navigate to url 'http://automationexercise.com'
        logger.info('Step 2: Navigating to automationexercise.com');
        await homePage.navigate();

        // 3. Verify that home page is visible successfully
        logger.info('Step 3: Verifying home page visibility');
        await homePage.verifyHomePageVisible();

        // 4. Click on 'Products' button
        logger.info('Step 4: Clicking Products button');
        await productsPage.clickProductsButton();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        logger.info('Step 5: Verifying ALL PRODUCTS page');
        await productsPage.verifyAllProductsPage();

        // 6. The products list is visible
        logger.info('Step 6: Verifying products list visibility');
        await productsPage.verifyProductsListVisible();

        // 7. Click on 'View Product' of first product
        logger.info('Step 7: Clicking View Product of first product');
        await productsPage.clickViewProductOfFirstProduct();

        // 8. User is landed to product detail page
        // 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
        logger.info('Steps 8-9: Verifying product detail page');
        await productDetailPage.verifyProductDetailPage();

        logger.info('Test Case 8: Verify All Products and product detail page - PASSED');
    } catch (error) {
        logger.error('Test Case 8: Verify All Products and product detail page - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})(); 