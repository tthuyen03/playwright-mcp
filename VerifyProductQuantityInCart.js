const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductDetailPage = require('./pages/ProductDetailPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click 'View Product' for any product on home page
        await productDetailPage.clickViewProduct();

        // 4. Verify product detail is opened
        await productDetailPage.verifyProductDetailVisible();

        // 5. Increase quantity to 4
        await productDetailPage.increaseQuantity(4);

        // 6. Click 'Add to cart' button
        await productDetailPage.clickAddToCart();

        // 7. Click 'View Cart' button
        await productDetailPage.clickViewCart();

        // 8. Verify that product is displayed in cart page with exact quantity
        await productDetailPage.verifyProductQuantityInCart(4);

        console.log('Test Case 13: Verify Product quantity in Cart - PASSED');
    } catch (error) {
        console.error('Test Case 13: Verify Product quantity in Cart - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 