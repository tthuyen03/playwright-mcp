const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class HomePage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.signupLoginButton = 'text=Signup / Login';
        this.loggedInAsText = 'text=Logged in as';
        this.deleteAccountButton = 'a[href="/delete_account"]';
    }

    async navigate() {
        await this.page.goto('http://automationexercise.com');
    }

    async verifyHomePageVisible() {
        const logo = this.page.locator('img[alt="Website for automation practice"]');
        await logo.waitFor({ state: 'visible', timeout: 5000 });
    
        const isVisible = await logo.isVisible();
        if (!isVisible) {
            throw new Error('Home page logo not visible. Home page might not have loaded properly.');
        }
    
        await this.page.waitForSelector('header', { state: 'visible' });
    }

    async clickSignupLogin() {
        logger.info('Clicking Signup/Login button');
        await this.page.click(this.signupLoginButton);
        await this.screenshotUtil.takeScreenshot('signup_login_clicked');
    }

    async scrollToFooter() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async verifySubscriptionTextVisible() {
        const subscriptionText = this.page.locator('text=SUBSCRIPTION');
        const isVisible = await subscriptionText.isVisible();
        if (!isVisible) {
            throw new Error('SUBSCRIPTION text not visible successfully');
        }
    }

    async enterEmailForSubscription(email) {
        await this.page.fill('input[type="email"]', email);
        await this.page.click('button[type="submit"]');
    }

    async verifySubscriptionSuccessMessageVisible() {
        const successMessage = this.page.locator('text=You have been successfully subscribed!');
        const isVisible = await successMessage.isVisible();
        if (!isVisible) {
            throw new Error('Subscription success message not visible successfully');
        }
    }

    async verifyLoggedInAs(username) {
        logger.info(`Verifying logged in as ${username}`);
        const loggedInText = await this.page.locator(this.loggedInAsText).textContent();
        if (!loggedInText.includes(username)) {
            throw new Error(`Expected to be logged in as ${username}, but found ${loggedInText}`);
        }
        await this.screenshotUtil.takeScreenshot('logged_in_verified');
        logger.info('Login verified successfully');
    }

    async clickDeleteAccountButton() {
        logger.info('Clicking Delete Account button');
        await this.page.click(this.deleteAccountButton);
        await this.screenshotUtil.takeScreenshot('delete_account_clicked');
    }
}

module.exports = HomePage; 