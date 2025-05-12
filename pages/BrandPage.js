class BrandPage {
    constructor(page) {
        this.page = page;
        this.productsButton = 'text=Products';
        this.brandsSidebar = '.brands_products';
        this.brandName = 'text=Brand Name'; // Replace with actual brand name
        this.brandPageTitle = 'text=Brand Products';
    }

    async clickProductsButton() {
        await this.page.click(this.productsButton);
    }

    async verifyBrandsVisible() {
        const isVisible = await this.page.locator(this.brandsSidebar).isVisible();
        if (!isVisible) {
            throw new Error('Brands not visible on left side bar');
        }
    }

    async clickBrandName(brandName) {
        await this.page.click(`text=${brandName}`);
    }

    async verifyBrandPageDisplayed() {
        const isVisible = await this.page.locator(this.brandPageTitle).isVisible();
        if (!isVisible) {
            throw new Error('Brand page not displayed successfully');
        }
    }

    async verifyProductsDisplayed() {
        const products = await this.page.locator('.product').count();
        if (products === 0) {
            throw new Error('No products displayed on the brand page');
        }
    }
}

module.exports = BrandPage; 