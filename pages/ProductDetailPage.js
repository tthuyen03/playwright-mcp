const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.productName = '.product-information h2';
        this.productCategory = '.product-information p:has-text("Category:")';
        this.productPrice = '.product-information span span';
        this.productAvailability = '.product-information p:has-text("Availability:")';
        this.productCondition = '.product-information p:has-text("Condition:")';
        this.productBrand = '.product-information p:has-text("Brand:")';
        this.viewProductButton = 'text=View Product';
        this.productDetail = '.product-details';
        this.quantityInput = 'input[type="number"]';
        this.addToCartButton = 'text=Add to cart';
        this.viewCartButton = 'text=View Cart';
        this.cartItems = '.cart_items';
        this.productQuantity = '.cart_quantity';
    }

    async verifyProductDetailPage() {
        logger.info('Verifying product detail page');
        
        // Verify product name
        const nameElement = await this.page.locator(this.productName);
        const isNameVisible = await nameElement.isVisible();
        if (!isNameVisible) {
            throw new Error('Product name is not visible');
        }
        const productName = await nameElement.textContent();
        logger.info(`Product name: ${productName}`);

        // Verify category
        const categoryElement = await this.page.locator(this.productCategory);
        const isCategoryVisible = await categoryElement.isVisible();
        if (!isCategoryVisible) {
            throw new Error('Product category is not visible');
        }
        const category = await categoryElement.textContent();
        logger.info(`Product category: ${category}`);

        // Verify price
        const priceElement = await this.page.locator(this.productPrice);
        const isPriceVisible = await priceElement.isVisible();
        if (!isPriceVisible) {
            throw new Error('Product price is not visible');
        }
        const price = await priceElement.textContent();
        logger.info(`Product price: ${price}`);

        // Verify availability
        const availabilityElement = await this.page.locator(this.productAvailability);
        const isAvailabilityVisible = await availabilityElement.isVisible();
        if (!isAvailabilityVisible) {
            throw new Error('Product availability is not visible');
        }
        const availability = await availabilityElement.textContent();
        logger.info(`Product availability: ${availability}`);

        // Verify condition
        const conditionElement = await this.page.locator(this.productCondition);
        const isConditionVisible = await conditionElement.isVisible();
        if (!isConditionVisible) {
            throw new Error('Product condition is not visible');
        }
        const condition = await conditionElement.textContent();
        logger.info(`Product condition: ${condition}`);

        // Verify brand
        const brandElement = await this.page.locator(this.productBrand);
        const isBrandVisible = await brandElement.isVisible();
        if (!isBrandVisible) {
            throw new Error('Product brand is not visible');
        }
        const brand = await brandElement.textContent();
        logger.info(`Product brand: ${brand}`);

        await this.screenshotUtil.takeScreenshot('product_details_verified');
        logger.info('Successfully verified all product details');
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