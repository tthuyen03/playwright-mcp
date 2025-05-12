const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const LoginPage = require('./pages/LoginPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Test data
    const email = 'min123@gmail.com';
    const password = 'Thanh123@';

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        //await homePage.verifyHomePage();

        // 3. Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // 4. Verify 'Login to your account' is visible
        await loginPage.verifyLoginPageVisible();

        // 5. Enter correct email address and password
        await loginPage.login(email, password);

        // 6. Verify that 'Logged in as username' is visible
        await loginPage.verifyLoggedInAsVisible();

        // 7. Click 'Logout' button
        await loginPage.clickLogout();
        // Add a delay to ensure navigation completes
        await page.waitForTimeout(2000);
        // 8. Verify that user is navigated to login page
        await loginPage.verifyLoginPageAfterLogout();

        console.log('Test Case 4: Logout User - PASSED');
    } catch (error) {
        console.error('Test Case 4: Logout User - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 