class SearchPage {
    constructor(page) {
        this.page = page;
        this.productsButton = 'text=Products';
        this.allProductsPageTitle = 'text=ALL PRODUCTS';
        this.searchInput = 'input[type="text"]';
        this.searchButton = 'button[type="submit"]';
        this.searchedProductsTitle = 'text=SEARCHED PRODUCTS';
        this.productList = '.product';
    }

    async clickProductsButton() {
        await this.page.click(this.productsButton);
    }

    async verifyAllProductsPageDisplayed() {
        const isVisible = await this.page.locator(this.allProductsPageTitle).isVisible();
        if (!isVisible) {
            throw new Error('ALL PRODUCTS page not displayed successfully');
        }
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchInput, productName);
        await this.page.click(this.searchButton);
    }

    async verifySearchedProductsVisible() {
        const isVisible = await this.page.locator(this.searchedProductsTitle).isVisible();
        if (!isVisible) {
            throw new Error('SEARCHED PRODUCTS not visible');
        }
    }

    async verifyProductsDisplayed() {
        const products = await this.page.locator(this.productList).count();
        if (products === 0) {
            throw new Error('No products displayed related to the search');
        }
    }
}

module.exports = SearchPage; 