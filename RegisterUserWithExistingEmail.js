const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const SignupPage = require('./pages/SignupPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    // Test data
    const name = 'Test User';
    const existingEmail = 'min123@gmail.com'; // Use an already registered email

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'New User Signup!' is visible
        await signupPage.verifyNewUserSignupVisible();

        // 5. Enter name and already registered email address
        await signupPage.enterNameAndEmail(name, existingEmail);

        // 6. Click 'Signup' button
        await signupPage.clickSignup();

        // 7. Verify error 'Email Address already exist!' is visible
        await signupPage.verifyEmailExistsErrorVisible();

        console.log('Test Case 5: Register User with existing email - PASSED');
    } catch (error) {
        console.error('Test Case 5: Register User with existing email - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 