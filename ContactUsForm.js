const { chromium } = require('playwright');
const HomePage = require('./pages/HomePage');
const ContactUsPage = require('./pages/ContactUsPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    // Test data
    const name = 'Test User';
    const email = 'testuser@example.com';
    const subject = 'Test Subject';
    const message = 'This is a test message for the contact form.';
    const filePath = './test-file.txt'; // Ensure this file exists or update the path

    try {
        // 1. Launch browser and navigate to url
        await homePage.navigate();

        // 2. Verify that home page is visible successfully
        await homePage.verifyHomePageVisible();

        // 3. Click on 'Contact Us' button
        await page.click('text=Contact Us');

        // 4. Verify 'GET IN TOUCH' is visible
        await contactUsPage.verifyGetInTouchVisible();

        // 5. Enter name, email, subject and message
        await contactUsPage.enterContactDetails(name, email, subject, message);

        // 6. Upload file
        await contactUsPage.uploadFile(filePath);

        // 7. Click 'Submit' button
        await contactUsPage.clickSubmit();

        // 8. Click OK button (handle alert)
        await contactUsPage.handleAlert();

        // 9. Verify success message 'Success! Your details have been submitted successfully.' is visible
        await contactUsPage.verifySuccessMessageVisible();

        // 10. Click 'Home' button and verify that landed to home page successfully
        await contactUsPage.clickHomeAndVerify();

        console.log('Test Case 6: Contact Us Form - PASSED');
    } catch (error) {
        console.error('Test Case 6: Contact Us Form - FAILED:', error);
    } finally {
        await browser.close();
    }
})(); 