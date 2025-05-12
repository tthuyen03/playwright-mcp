const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const RecommendedItemsPage = require('./pages/RecommendedItemsPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const recommendedItemsPage = new RecommendedItemsPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Scroll to bottom of page
        await recommendedItemsPage.scrollToBottom();

        // 4. Verify 'RECOMMENDED ITEMS' are visible
        await recommendedItemsPage.verifyRecommendedItemsVisible();

        // 5. Click on 'Add To Cart' on Recommended product
        await recommendedItemsPage.clickAddToCart();

        // 6. Click on 'View Cart' button
        await recommendedItemsPage.clickViewCart();

        // 7. Verify that product is displayed in cart page
        await recommendedItemsPage.verifyProductInCart();

        console.log('Test Case 22: Add to cart from Recommended items - PASSED');
    } catch (error) {
        console.error('Test Case 22: Add to cart from Recommended items - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 