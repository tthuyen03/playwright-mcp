class RecommendedItemsPage {
    constructor(page) {
        this.page = page;
        this.recommendedItemsTitle = 'text=RECOMMENDED ITEMS';
        this.addToCartButton = 'text=Add To Cart';
        this.viewCartButton = 'text=View Cart';
        this.cartItems = '.cart_items';
    }

    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async verifyRecommendedItemsVisible() {
        const isVisible = await this.page.locator(this.recommendedItemsTitle).isVisible();
        if (!isVisible) {
            throw new Error('RECOMMENDED ITEMS not visible');
        }
    }

    async clickAddToCart() {
        await this.page.click(this.addToCartButton);
    }

    async clickViewCart() {
        await this.page.click(this.viewCartButton);
    }

    async verifyProductInCart() {
        const cartItems = await this.page.locator(this.cartItems).count();
        if (cartItems === 0) {
            throw new Error('No products displayed in the cart');
        }
    }
}

module.exports = RecommendedItemsPage; 