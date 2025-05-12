class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.viewProductButton = 'text=View Product';
        this.productDetail = '.product-details';
        this.quantityInput = 'input[type="number"]';
        this.addToCartButton = 'text=Add to cart';
        this.viewCartButton = 'text=View Cart';
        this.cartItems = '.cart_items';
        this.productQuantity = '.cart_quantity';
    }

    async clickViewProduct() {
        await this.page.click(this.viewProductButton);
    }

    async verifyProductDetailVisible() {
        const productDetail = await this.page.locator(this.productDetail).isVisible();
        if (!productDetail) {
            throw new Error('Product detail not visible successfully');
        }
    }

    async increaseQuantity(quantity) {
        await this.page.fill(this.quantityInput, quantity.toString());
    }

    async clickAddToCart() {
        await this.page.click(this.addToCartButton);
    }

    async clickViewCart() {
        await this.page.click(this.viewCartButton);
    }

    async verifyProductQuantityInCart(expectedQuantity) {
        const quantity = await this.page.locator(this.productQuantity).textContent();
        if (parseInt(quantity) !== expectedQuantity) {
            throw new Error(`Expected quantity ${expectedQuantity}, but found ${quantity}`);
        }
    }
}

module.exports = ProductDetailPage; 