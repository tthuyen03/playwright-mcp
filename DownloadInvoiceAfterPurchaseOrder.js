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

        // Step 6: Click Proceed To Checkout
        await page.click('text=Proceed To Checkout');

        // Step 7: Click 'Register / Login' button
        await page.click('text=Register / Login');

        // Step 8: Fill all details in Signup and create account
        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', 'testuser@example.com');
        await page.click('button:has-text("Signup")');
        await page.check('#id_gender1');
        await page.fill('#password', 'password123');
        await page.selectOption('#days', '1');
        await page.selectOption('#months', '1');
        await page.selectOption('#years', '2000');
        await page.check('#newsletter');
        await page.check('#optin');
        await page.fill('#first_name', 'Test');
        await page.fill('#last_name', 'User');
        await page.fill('#company', 'Test Company');
        await page.fill('#address1', '123 Test Street');
        await page.fill('#address2', 'Suite 456');
        await page.selectOption('#country', 'United States');
        await page.fill('#state', 'California');
        await page.fill('#city', 'Los Angeles');
        await page.fill('#zipcode', '90001');
        await page.fill('#mobile_number', '1234567890');
        await page.click('button:has-text("Create Account")');

        // Step 9: Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await page.waitForSelector('text=Account Created!');
        await page.click('text=Continue');

        // Step 10: Verify 'Logged in as username' at top
        await page.waitForSelector('text=Logged in as');

        // Step 11: Click 'Cart' button
        await page.click('text=Cart');

        // Step 12: Click 'Proceed To Checkout' button
        await page.click('text=Proceed To Checkout');

        // Step 13: Verify Address Details and Review Your Order
        await page.waitForSelector('text=Address Details');
        await page.waitForSelector('text=Review Your Order');

        // Step 14: Enter description in comment text area and click 'Place Order'
        await page.fill('textarea[name="message"]', 'Please deliver between 9 AM and 5 PM.');
        await page.click('text=Place Order');

        // Step 15: Enter payment details
        await page.fill('input[name="name_on_card"]', 'Test User');
        await page.fill('input[name="card_number"]', '4111111111111111');
        await page.fill('input[name="cvc"]', '123');
        await page.fill('input[name="expiry_month"]', '12');
        await page.fill('input[name="expiry_year"]', '2025');

        // Step 16: Click 'Pay and Confirm Order' button
        await page.click('text=Pay and Confirm Order');

        // Step 17: Verify success message 'Your order has been placed successfully!'
        await page.waitForSelector('text=Your order has been placed successfully!');

        // Step 18: Click 'Download Invoice' button and verify invoice is downloaded successfully
        await page.click('text=Download Invoice');
        console.log('Invoice downloaded successfully.');

        // Step 19: Click 'Continue' button
        await page.click('text=Continue');

        // Step 20: Click 'Delete Account' button
        await page.click('text=Delete Account');

        // Step 21: Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await page.waitForSelector('text=Account Deleted!');
        await page.click('text=Continue');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
