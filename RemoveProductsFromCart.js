const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Step 1: Navigate to URL
        await page.goto('http://automationexercise.com');

        // Step 2: Verify that home page is visible successfully
        await page.waitForSelector('title');
        const title = await page.title();
        if (!title.includes('Automation Exercise')) {
            throw new Error('Home page not visible successfully');
        }

        // Step 3: Add products to cart
        await page.click('text=Add to cart', { timeout: 5000 });
        await page.click('text=Continue Shopping');

        // Step 4: Click 'Cart' button
        await page.click('text=Cart');

        // Step 5: Verify that cart page is displayed
        await page.waitForSelector('text=Shopping Cart');

        // Step 6: Click 'X' button corresponding to a particular product
        await page.click('.cart_quantity_delete');

        // Step 7: Verify that product is removed from the cart
        const cartItems = await page.$$('.cart_product');
        if (cartItems.length > 0) {
            throw new Error('Product was not removed from the cart');
        }
        console.log('Product successfully removed from the cart.');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
