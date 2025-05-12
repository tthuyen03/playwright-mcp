const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const CategoryPage = require('./pages/CategoryPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Verify that categories are visible on left side bar
        await categoryPage.verifyCategoriesVisible();

        // 4. Click on 'Women' category
        await categoryPage.clickWomenCategory();

        // 5. Click on any category link under 'Women' category, for example: Dress
        await categoryPage.clickDressCategory();

        // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        await categoryPage.verifyCategoryPageDisplayed();

        // 7. On left side bar, click on any sub-category link of 'Men' category
        await categoryPage.clickMenCategory();
        await categoryPage.clickSubCategory('Tshirts');

        // 8. Verify that user is navigated to that category page
        await categoryPage.verifySubCategoryPageDisplayed('Tshirts');

        console.log('Test Case 18: View Category Products - PASSED');
    } catch (error) {
        console.error('Test Case 18: View Category Products - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 