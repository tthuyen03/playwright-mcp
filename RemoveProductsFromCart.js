const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');
const CartPage = require('./pages/CartPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 17: Remove Products From Cart');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

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

        // 7. Click 'X' button corresponding to particular product
        logger.info('Step 7: Removing product from cart');
        await cartPage.removeProductFromCart();

        // 8. Verify that product is removed from the cart
        logger.info('Step 8: Verifying product removal');
        await cartPage.verifyProductRemoved();

        logger.info('Test Case 17: Remove Products From Cart - PASSED');
    } catch (error) {
        logger.error('Test Case 17: Remove Products From Cart - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})();
