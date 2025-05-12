class CartPage {
    constructor(page) {
        this.page = page;
        this.cartButton = 'text=Cart';
        this.subscriptionText = 'text=SUBSCRIPTION';
        this.emailInput = 'input[type="email"]';
        this.submitButton = 'button[type="submit"]';
        this.successMessage = 'text=You have been successfully subscribed!';
    }

    async clickCartButton() {
        await this.page.click(this.cartButton);
    }

    async scrollToFooter() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async verifySubscriptionTextVisible() {
        const isVisible = await this.page.locator(this.subscriptionText).isVisible();
        if (!isVisible) {
            throw new Error('SUBSCRIPTION text not visible successfully');
        }
    }

    async enterEmailForSubscription(email) {
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.submitButton);
    }

    async verifySubscriptionSuccessMessageVisible() {
        const isVisible = await this.page.locator(this.successMessage).isVisible();
        if (!isVisible) {
            throw new Error('Subscription success message not visible successfully');
        }
    }
}

module.exports = CartPage; 