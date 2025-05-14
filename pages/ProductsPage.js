const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.productsButton = 'a[href="/products"]';
        this.allProductsTitle = 'text=All Products';
        this.searchInput = '#search_product';
        this.searchButton = '#submit_search';
        this.searchedProductsTitle = 'text=Searched Products';
        this.productItems = '.single-products';
        this.firstProduct = '.features_items .productinfo:first-child';
        this.secondProduct = '.features_items .productinfo:nth-child(2)';
        this.addToCartButton = 'text=Add to cart';
        this.continueShoppingButton = 'text=Continue Shopping';
        this.viewCartButton = 'text=View Cart';
        this.cartItems = '.cart_items';
        this.productPrice = '.cart_price';
        this.productQuantity = '.cart_quantity';
        this.productTotal = '.cart_total';
        this.viewProductButtons = 'a[href*="/product_details/"]';
        this.productsList = '.features_items';
        // New locators for review functionality
        this.writeReviewTitle = 'text=Write Your Review';
        this.reviewNameInput = '#name';
        this.reviewEmailInput = '#email';
        this.reviewTextInput = '#review';
        this.submitReviewButton = '#button-review';
        this.reviewSuccessMessage = '.alert-success';
    }

    async clickProductsButton() {
        logger.info('Clicking Products button');
        await this.page.click(this.productsButton);
        await this.screenshotUtil.takeScreenshot('products_button_clicked');
    }

    async verifyAllProductsPage() {
        logger.info('Verifying ALL PRODUCTS page');
        const titleText = await this.page.locator(this.allProductsTitle).textContent();
        if (!titleText.includes('All Products')) {
            throw new Error('Not on ALL PRODUCTS page');
        }
        await this.screenshotUtil.takeScreenshot('all_products_page');
        logger.info('Successfully verified ALL PRODUCTS page');
    }

    async verifyProductsListVisible() {
        logger.info('Verifying products list visibility');
        const productsList = await this.page.locator(this.productsList);
        const isVisible = await productsList.isVisible();
        if (!isVisible) {
            throw new Error('Products list is not visible');
        }
        const productCount = await this.page.locator(this.productItems).count();
        if (productCount === 0) {
            throw new Error('No products found in the list');
        }
        await this.screenshotUtil.takeScreenshot('products_list_visible');
        logger.info(`Found ${productCount} products in the list`);
    }

    async clickViewProductOfFirstProduct() {
        logger.info('Clicking View Product of first product');
        const firstViewProductButton = await this.page.locator(this.viewProductButtons).first();
        await firstViewProductButton.click();
        await this.screenshotUtil.takeScreenshot('view_product_clicked');
    }

    async searchProduct(productName) {
        logger.info(`Searching for product: ${productName}`);
        await this.page.fill(this.searchInput, productName);
        await this.page.click(this.searchButton);
    }

    async verifySearchedProducts() {
        logger.info('Verifying SEARCHED PRODUCTS visibility');
        const titleText = await this.page.locator(this.searchedProductsTitle).textContent();
        if (!titleText.includes('Searched Products')) {
            throw new Error('SEARCHED PRODUCTS title not found');
        }
        await this.screenshotUtil.takeScreenshot('searched_products');
        logger.info('Successfully verified SEARCHED PRODUCTS visibility');
    }

    async verifySearchedProductsList() {
        logger.info('Verifying searched products list');
        const products = await this.page.$$(this.productItems);
        if (products.length === 0) {
            throw new Error('No products found in search results');
        }
        await this.screenshotUtil.takeScreenshot('searched_products_list');
        logger.info(`Found ${products.length} products in search results`);
    }

    async hoverAndAddToCartByName(productName) {
        // Xác định container của sản phẩm theo tên
        const productCard = this.page.locator('.productinfo:has-text("' + productName + '")');
    
        // Hover vào product để hiện nút "Add to cart"
        await productCard.hover();
    
        // Click nút Add to Cart bên trong cùng container
        const addToCartButton = productCard.locator('text=Add to cart');
        await addToCartButton.click();
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

    async verifyWriteReviewVisible() {
        logger.info('Verifying Write Your Review section visibility');
        const reviewTitle = await this.page.locator(this.writeReviewTitle);
        const isVisible = await reviewTitle.isVisible();
        if (!isVisible) {
            throw new Error('Write Your Review section is not visible');
        }
        await this.screenshotUtil.takeScreenshot('write_review_section');
        logger.info('Write Your Review section is visible');
    }

    async submitReview(reviewDetails) {
        logger.info('Submitting product review');
        await this.page.fill(this.reviewNameInput, reviewDetails.name);
        await this.page.fill(this.reviewEmailInput, reviewDetails.email);
        await this.page.fill(this.reviewTextInput, reviewDetails.review);
        await this.screenshotUtil.takeScreenshot('review_form_filled');
        await this.page.click(this.submitReviewButton);
        logger.info('Review submitted successfully');
    }

    async verifyReviewSuccess() {
        logger.info('Verifying review submission success');
        const successMessage = await this.page.locator(this.reviewSuccessMessage);
        const isVisible = await successMessage.isVisible();
        if (!isVisible) {
            throw new Error('Review success message is not visible');
        }
        const messageText = await successMessage.textContent();
        if (!messageText.includes('Thank you for your review')) {
            throw new Error('Review success message is incorrect');
        }
        await this.screenshotUtil.takeScreenshot('review_success');
        logger.info('Review submission verified successfully');
    }
}

module.exports = ProductsPage; 