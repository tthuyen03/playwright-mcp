const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class CartPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.cartButton = 'a[href="/view_cart"]';
        this.cartPageTitle = 'text=Shopping Cart';
        this.proceedToCheckoutButton = 'text=Proceed To Checkout';
        this.subscriptionText = 'text=SUBSCRIPTION';
        this.emailInput = 'input[type="email"]';
        this.submitButton = 'button[type="submit"]';
        this.successMessage = 'text=You have been successfully subscribed!';
        this.cartItems = '.cart_items tr';
        this.removeButtons = '.cart_quantity_delete';
        this.emptyCartMessage = 'text=Cart is empty!';
    }

    async clickCartButton() {
        logger.info('Clicking Cart button');
        await this.page.click(this.cartButton);
        await this.screenshotUtil.takeScreenshot('cart_button_clicked');
    }

    async verifyCartPageDisplayed() {
        logger.info('Verifying cart page display');
        const titleText = await this.page.locator(this.cartPageTitle).textContent();
        if (!titleText.includes('Shopping Cart')) {
            throw new Error('Cart page not displayed successfully');
        }
        await this.screenshotUtil.takeScreenshot('cart_page_displayed');
        logger.info('Cart page verified successfully');
    }

    async getCartItemsCount() {
        const items = await this.page.locator(this.cartItems).count();
        // Subtract 1 for the header row
        return items - 1;
    }

    async removeProductFromCart() {
        logger.info('Removing product from cart');
        const removeButton = await this.page.locator(this.removeButtons).first();
        await removeButton.click();
        await this.screenshotUtil.takeScreenshot('product_removed');
        logger.info('Product removed from cart');
    }

    async verifyProductRemoved() {
        logger.info('Verifying product removal');
        const currentItemsCount = await this.getCartItemsCount();
        if (currentItemsCount !== 0) {
            throw new Error(`Expected 0 items in cart, but found ${currentItemsCount}`);
        }
        await this.screenshotUtil.takeScreenshot('cart_empty_verified');
        logger.info('Successfully verified product removal');
    }

    async clickProceedToCheckout() {
        logger.info('Clicking Proceed To Checkout button');
        await this.page.click(this.proceedToCheckoutButton);
        await this.screenshotUtil.takeScreenshot('proceed_to_checkout_clicked');
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