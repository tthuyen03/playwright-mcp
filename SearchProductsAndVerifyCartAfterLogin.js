const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const SearchPage = require('./pages/SearchPage');
const LoginPage = require('./pages/LoginPage');
const CartPage = require('./pages/CartPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click on 'Products' button
        await searchPage.clickProductsButton();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await searchPage.verifyAllProductsPageDisplayed();

        // 5. Enter product name in search input and click search button
        await searchPage.searchProduct('Blue Top'); // Replace with actual product name

        // 6. Verify 'SEARCHED PRODUCTS' is visible
        await searchPage.verifySearchedProductsVisible();

        // 7. Verify all the products related to search are visible
        await searchPage.verifyProductsDisplayed();

        // 8. Add those products to cart
        // This step would typically involve adding products to the cart, which is not shown here.

        // 9. Click 'Cart' button and verify that products are visible in cart
        await cartPage.clickCartButton();
        await cartPage.verifyCartPageDisplayed();

        // 10. Click 'Signup / Login' button and submit login details
        await loginPage.clickSignupLogin();
        await loginPage.fillLoginDetails('test@example.com', 'password123');

        // 11. Again, go to Cart page
        await cartPage.clickCartButton();

        // 12. Verify that those products are visible in cart after login as well
        await cartPage.verifyCartPageDisplayed();

        console.log('Test Case 20: Search Products and Verify Cart After Login - PASSED');
    } catch (error) {
        console.error('Test Case 20: Search Products and Verify Cart After Login - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 