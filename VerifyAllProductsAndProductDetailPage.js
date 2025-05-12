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

        // Step 3: Click on 'Products' button
        await page.click('text=Products');

        // Step 4: Verify user is navigated to ALL PRODUCTS page successfully
        await page.waitForSelector('text=All Products');

        // Step 5: Verify the products list is visible
        await page.waitForSelector('.features_items');

        // Step 6: Click on 'View Product' of first product
        await page.click('.features_items .productinfo img');

        // Step 7: User is landed to product detail page
        await page.waitForSelector('.product-information');

        // Step 8: Verify that product details are visible
        const productName = await page.textContent('.product-information h2');
        const category = await page.textContent('.product-information p:nth-of-type(1)');
        const price = await page.textContent('.product-information span');
        const availability = await page.textContent('.product-information p:nth-of-type(2)');
        const condition = await page.textContent('.product-information p:nth-of-type(3)');
        const brand = await page.textContent('.product-information p:nth-of-type(4)');

        console.log('Product Details:');
        console.log('Name:', productName);
        console.log('Category:', category);
        console.log('Price:', price);
        console.log('Availability:', availability);
        console.log('Condition:', condition);
        console.log('Brand:', brand);

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
