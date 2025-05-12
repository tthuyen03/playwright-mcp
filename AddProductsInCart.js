const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ProductsPage = require('./pages/ProductsPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click 'Products' button
        await productsPage.clickProductsButton();

        // 4. Hover over first product and click 'Add to cart'
        await productsPage.hoverAndAddToCart(productsPage.firstProduct);

        // 5. Click 'Continue Shopping' button
        await productsPage.clickContinueShopping();

        // 6. Hover over second product and click 'Add to cart'
        await productsPage.hoverAndAddToCart(productsPage.secondProduct);

        // 7. Click 'View Cart' button
        await productsPage.clickViewCart();

        // 8. Verify both products are added to Cart
        await productsPage.verifyProductsInCart();

        // 9. Verify their prices, quantity and total price
        await productsPage.verifyProductDetails();

        console.log('Test Case 12: Add Products in Cart - PASSED');
    } catch (error) {
        console.error('Test Case 12: Add Products in Cart - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 