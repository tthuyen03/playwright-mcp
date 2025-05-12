const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const BrandPage = require('./pages/BrandPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const brandPage = new BrandPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click on 'Products' button
        await brandPage.clickProductsButton();

        // 4. Verify that Brands are visible on left side bar
        await brandPage.verifyBrandsVisible();

        // 5. Click on any brand name
        await brandPage.clickBrandName('Brand Name'); // Replace with actual brand name

        // 6. Verify that user is navigated to brand page and brand products are displayed
        await brandPage.verifyBrandPageDisplayed();
        await brandPage.verifyProductsDisplayed();

        // 7. On left side bar, click on any other brand link
        await brandPage.clickBrandName('Another Brand Name'); // Replace with another actual brand name

        // 8. Verify that user is navigated to that brand page and can see products
        await brandPage.verifyBrandPageDisplayed();
        await brandPage.verifyProductsDisplayed();

        console.log('Test Case 19: View & Cart Brand Products - PASSED');
    } catch (error) {
        console.error('Test Case 19: View & Cart Brand Products - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 