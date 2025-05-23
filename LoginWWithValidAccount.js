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

        // Step 3: Click on 'Signup / Login' button
        await page.click('text=Signup / Login');

        // Step 4: Verify 'Login to your account' is visible
        await page.waitForSelector('text=Login to your account');

        // Step 5: Enter incorrect email address and password
        await page.fill('input[name="email"]', 'invaliduser@example.com');
        await page.fill('input[name="password"]', 'wrongpassword');

        // Step 6: Click 'login' button
        await page.click('button:has-text("Login")');

        // Step 7: Verify error 'Your email or password is incorrect!' is visible
        await page.waitForSelector('text=Your email or password is incorrect!');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
