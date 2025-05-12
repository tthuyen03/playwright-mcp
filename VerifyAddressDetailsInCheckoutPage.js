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

        // Step 3: Click 'Signup / Login' button
        await page.click('text=Signup / Login');

        // Step 4: Fill all details in Signup and create account
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
        const addressDetails = {
            firstName: 'Test',
            lastName: 'User',
            company: 'Test Company',
            address1: '123 Test Street',
            address2: 'Suite 456',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };
        await page.fill('#first_name', addressDetails.firstName);
        await page.fill('#last_name', addressDetails.lastName);
        await page.fill('#company', addressDetails.company);
        await page.fill('#address1', addressDetails.address1);
        await page.fill('#address2', addressDetails.address2);
        await page.selectOption('#country', addressDetails.country);
        await page.fill('#state', addressDetails.state);
        await page.fill('#city', addressDetails.city);
        await page.fill('#zipcode', addressDetails.zipcode);
        await page.fill('#mobile_number', addressDetails.mobileNumber);
        await page.click('button:has-text("Create Account")');

        // Step 5: Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await page.waitForSelector('text=Account Created!');
        await page.click('text=Continue');

        // Step 6: Verify 'Logged in as username' at top
        await page.waitForSelector('text=Logged in as');

        // Step 7: Add products to cart
        await page.click('text=Add to cart', { timeout: 5000 });
        await page.click('text=Continue Shopping');

        // Step 8: Click 'Cart' button
        await page.click('text=Cart');

        // Step 9: Verify that cart page is displayed
        await page.waitForSelector('text=Shopping Cart');

        // Step 10: Click Proceed To Checkout
        await page.click('text=Proceed To Checkout');

        // Step 11: Verify that the delivery address is same as the address filled during registration
        const deliveryAddress = await page.textContent('#address_delivery');
        if (!deliveryAddress.includes(addressDetails.address1) ||
            !deliveryAddress.includes(addressDetails.city) ||
            !deliveryAddress.includes(addressDetails.state) ||
            !deliveryAddress.includes(addressDetails.zipcode)) {
            throw new Error('Delivery address does not match the registration address');
        }

        // Step 12: Verify that the billing address is same as the address filled during registration
        const billingAddress = await page.textContent('#address_invoice');
        if (!billingAddress.includes(addressDetails.address1) ||
            !billingAddress.includes(addressDetails.city) ||
            !billingAddress.includes(addressDetails.state) ||
            !billingAddress.includes(addressDetails.zipcode)) {
            throw new Error('Billing address does not match the registration address');
        }

        console.log('Delivery and billing addresses match the registration address.');

        // Step 13: Click 'Delete Account' button
        await page.click('text=Delete Account');

        // Step 14: Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await page.waitForSelector('text=Account Deleted!');
        await page.click('text=Continue');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
