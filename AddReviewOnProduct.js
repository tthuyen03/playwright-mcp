const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Step 1: Navigate to URL
        await page.goto('http://automationexercise.com');

        // Step 2: Click on 'Products' button
        await page.click('text=Products');

        // Step 3: Verify user is navigated to ALL PRODUCTS page successfully
        await page.waitForSelector('text=All Products');

        // Step 4: Click on 'View Product' button
        await page.click('.features_items .productinfo img');

        // Step 5: Verify 'Write Your Review' is visible
        await page.waitForSelector('text=Write Your Review');

        // Step 6: Enter name, email, and review
        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.fill('textarea[name="review"]', 'This is a great product!');

        // Step 7: Click 'Submit' button
        await page.click('button:has-text("Submit")');

        // Step 8: Verify success message 'Thank you for your review.'
        await page.waitForSelector('text=Thank you for your review.');

        console.log('Review submitted successfully.');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
