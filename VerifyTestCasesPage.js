const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const TestCasesPage = require('./pages/TestCasesPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const testCasesPage = new TestCasesPage(page);

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click on 'Test Cases' button
        await page.click('text=Test Cases');

        // 4. Verify user is navigated to test cases page successfully
        await testCasesPage.verifyTestCasesPageVisible();

        console.log('Test Case 7: Verify Test Cases Page - PASSED');
    } catch (error) {
        console.error('Test Case 7: Verify Test Cases Page - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 