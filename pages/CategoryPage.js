class CategoryPage {
    constructor(page) {
        this.page = page;
        this.categoriesSidebar = '.left-sidebar';
        this.womenCategory = 'text=Women';
        this.dressCategory = 'text=Dress';
        this.menCategory = 'text=Men';
        this.categoryPageTitle = 'text=WOMEN - TOPS PRODUCTS';
    }

    async verifyCategoriesVisible() {
        const isVisible = await this.page.locator(this.categoriesSidebar).isVisible();
        if (!isVisible) {
            throw new Error('Categories not visible on left side bar');
        }
    }

    async clickWomenCategory() {
        await this.page.click(this.womenCategory);
    }

    async clickDressCategory() {
        await this.page.click(this.dressCategory);
    }

    async verifyCategoryPageDisplayed() {
        const isVisible = await this.page.locator(this.categoryPageTitle).isVisible();
        if (!isVisible) {
            throw new Error('Category page not displayed successfully');
        }
    }

    async clickMenCategory() {
        await this.page.click(this.menCategory);
    }

    async clickSubCategory(subCategory) {
        await this.page.click(`text=${subCategory}`);
    }

    async verifySubCategoryPageDisplayed(subCategory) {
        const isVisible = await this.page.locator(`text=${subCategory}`).isVisible();
        if (!isVisible) {
            throw new Error(`Sub-category page for ${subCategory} not displayed successfully`);
        }
    }
}

module.exports = CategoryPage; 