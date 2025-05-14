const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.signupLoginButton = 'text=Signup / Login';
        this.loginTitle = 'text=Login to your account';
        this.emailInput = 'input[data-qa="login-email"]';
        this.passwordInput = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.loggedInMessage = 'text=Logged in as';
        this.errorMessage = 'text=Your email or password is incorrect!';
    }

    async clickSignupLogin() {
        logger.info('Clicking Signup/Login button');
        await this.page.click(this.signupLoginButton);
        await this.screenshotUtil.takeScreenshot('signup_login_clicked');
    }

    async verifyLoginPageVisible() {
        logger.info('Verifying login page visibility');
        const isVisible = await this.page.locator(this.loginTitle).isVisible();
        if (!isVisible) {
            throw new Error('Login page title not visible');
        }
        await this.screenshotUtil.takeScreenshot('login_page_visible');
        logger.info('Login page verified successfully');
    }

    async fillLoginDetails(email, password) {
        logger.info('Filling login details');
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.screenshotUtil.takeScreenshot('login_details_filled');
        logger.info('Login details filled successfully');
    }

    async clickLoginButton() {
        logger.info('Clicking login button');
        await this.page.click(this.loginButton);
        await this.screenshotUtil.takeScreenshot('login_button_clicked');
    }

    async verifyLoginError() {
        logger.info('Verifying login error message');
        const isVisible = await this.page.locator(this.errorMessage).isVisible();
        if (!isVisible) {
            throw new Error('Login error message not visible');
        }
        await this.screenshotUtil.takeScreenshot('login_error_verified');
        logger.info('Login error message verified successfully');
    }

    async verifyLoggedInAs(username) {
        logger.info(`Verifying logged in as ${username}`);
        const loggedInText = await this.page.locator(this.loggedInMessage).textContent();
        if (!loggedInText.includes(username)) {
            throw new Error(`Expected to be logged in as ${username}, but found ${loggedInText}`);
        }
        await this.screenshotUtil.takeScreenshot('logged_in_verified');
        logger.info('Login verified successfully');
    }
}

module.exports = LoginPage; 