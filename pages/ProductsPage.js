class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsButton = 'text=Products';
        this.firstProduct = '.features_items .productinfo:first-child';
        this.secondProduct = '.features_items .productinfo:nth-child(2)';
        this.addToCartButton = 'text=Add to cart';
        this.continueShoppingButton = 'text=Continue Shopping';
        this.viewCartButton = 'text=View Cart';
        this.cartItems = '.cart_items';
        this.productPrice = '.cart_price';
        this.productQuantity = '.cart_quantity';
        this.productTotal = '.cart_total';
    }

    async clickProductsButton() {
        await this.page.click(this.productsButton);
    }

    async hoverAndAddToCart(productSelector) {
        await this.page.hover(productSelector);
        await this.page.click(this.addToCartButton);
    }

    async clickContinueShopping() {
        await this.page.click(this.continueShoppingButton);
    }

    async clickViewCart() {
        await this.page.click(this.viewCartButton);
    }

    async verifyProductsInCart() {
        const cartItems = await this.page.locator(this.cartItems).count();
        if (cartItems !== 2) {
            throw new Error('Expected 2 products in cart, but found ' + cartItems);
        }
    }

    async verifyProductDetails() {
        const prices = await this.page.locator(this.productPrice).allTextContents();
        const quantities = await this.page.locator(this.productQuantity).allTextContents();
        const totals = await this.page.locator(this.productTotal).allTextContents();

        console.log('Product Prices:', prices);
        console.log('Product Quantities:', quantities);
        console.log('Product Totals:', totals);

        // Verify prices, quantities, and totals as needed
        // This is a basic check; you might want to add more specific assertions
    }
}

module.exports = ProductsPage; 