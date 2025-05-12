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

        // Step 5: Enter product name in search input and click search button
        await page.fill('input[name="search"]', 'Dress');
        await page.click('button:has-text("Search")');

        // Step 6: Verify 'SEARCHED PRODUCTS' is visible
        await page.waitForSelector('text=Searched Products');

        // Step 7: Verify all the products related to search are visible
        const products = await page.$$('.features_items .productinfo');
        if (products.length === 0) {
            throw new Error('No products found for the search query');
        }
        console.log(`Found ${products.length} products related to the search.`);

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
