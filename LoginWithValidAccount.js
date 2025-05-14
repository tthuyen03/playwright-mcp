const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const LoginPage = require('./pages/LoginPage');
const SignupPage = require('./pages/SignupPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 2: Login User with correct email and password');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    try {
        // 1. Launch browser
        logger.info('Step 1: Browser launched successfully');

        // 2. Navigate to url 'http://automationexercise.com'
        logger.info('Step 2: Navigating to automationexercise.com');
        await homePage.navigate();

        // 3. Verify that home page is visible successfully
        logger.info('Step 3: Verifying home page visibility');
        await homePage.verifyHomePageVisible();

        // 4. Click on 'Signup / Login' button
        logger.info('Step 4: Clicking Signup/Login button');
        await loginPage.clickSignupLogin();

        // 5. Verify 'Login to your account' is visible
        logger.info('Step 5: Verifying login page visibility');
        await loginPage.verifyLoginPageVisible();

        // 6. Enter correct email address and password
        logger.info('Step 6: Entering correct login details');
        await loginPage.fillLoginDetails('test@example.com', 'password123');

        // 7. Click 'login' button
        logger.info('Step 7: Clicking login button');
        await loginPage.clickLoginButton();

        // 8. Verify that 'Logged in as username' is visible
        logger.info('Step 8: Verifying logged in status');
        await homePage.verifyLoggedInAs('test');

        // 9. Click 'Delete Account' button
        logger.info('Step 9: Clicking Delete Account button');
        await homePage.clickDeleteAccountButton();

        // 10. Verify that 'ACCOUNT DELETED!' is visible
        logger.info('Step 10: Verifying account deletion');
        await signupPage.verifyAccountDeleted();

        logger.info('Test Case 2: Login User with correct email and password - PASSED');
    } catch (error) {
        logger.error('Test Case 2: Login User with correct email and password - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})(); 