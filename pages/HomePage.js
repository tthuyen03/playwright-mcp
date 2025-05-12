const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginButton = 'text=Signup / Login';
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
    
        // Kiểm tra phần tử header để chắc chắn toàn bộ trang đã tải
        await this.page.waitForSelector('header', { state: 'visible' });
    }
    


    async clickSignupLogin() {
        await this.page.click(this.signupLoginButton);
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
}

module.exports = HomePage; 