const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const LoginPage = require('./pages/LoginPage');
const logger = require('./utils/logger');

(async () => {
    logger.info('Starting Test Case 3: Login User with incorrect email and password');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

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

        // 6. Enter incorrect email address and password
        logger.info('Step 6: Entering incorrect login details');
        await loginPage.fillLoginDetails('invalid@email.com', 'wrongpassword');

        // 7. Click 'login' button
        logger.info('Step 7: Clicking login button');
        await loginPage.clickLoginButton();

        // 8. Verify error 'Your email or password is incorrect!' is visible
        logger.info('Step 8: Verifying login error message');
        await loginPage.verifyLoginError();

        logger.info('Test Case 3: Login User with incorrect email and password - PASSED');
    } catch (error) {
        logger.error('Test Case 3: Login User with incorrect email and password - FAILED');
        logger.error(`Error details: ${error.message}`);
    } finally {
        logger.info('Cleaning up: Closing browser');
        await browser.close();
    }
})();
