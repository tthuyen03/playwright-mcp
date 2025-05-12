class ContactUsPage {
    constructor(page) {
        this.page = page;
        this.getInTouchText = 'text=GET IN TOUCH';
        this.nameInput = 'input[name="name"]';
        this.emailInput = 'input[name="email"]';
        this.subjectInput = 'input[name="subject"]';
        this.messageInput = 'textarea[name="message"]';
        this.uploadFileInput = 'input[name="upload_file"]';
        this.submitButton = 'input[type="submit"]';
        this.successMessageText = 'text=Success! Your details have been submitted successfully.';
        this.homeButton = 'text=Home';
    }

    async verifyGetInTouchVisible() {
        const getInTouchElement = this.page.locator(this.getInTouchText);
        const isVisible = await getInTouchElement.isVisible();
        if (!isVisible) {
            throw new Error('GET IN TOUCH not visible successfully');
        }
    }

    async enterContactDetails(name, email, subject, message) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.subjectInput, subject);
        await this.page.fill(this.messageInput, message);
    }

    async uploadFile(filePath) {
        await this.page.setInputFiles(this.uploadFileInput, filePath);
    }

    async clickSubmit() {
        await this.page.click(this.submitButton);
    }

    async handleAlert() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async verifySuccessMessageVisible() {
        // Wait for the success message to be visible
        await this.page.waitForSelector(this.successMessageText, { state: 'visible', timeout: 5000 });
        const successMessageElement = this.page.locator(this.successMessageText);
        const isVisible = await successMessageElement.isVisible();
        if (!isVisible) {
            throw new Error('Success message not visible successfully');
        }
    }

    async clickHomeAndVerify() {
        await this.page.click(this.homeButton);
        // Wait for navigation to complete
        await this.page.waitForLoadState('networkidle');
        // Verify home page is visible (you can reuse HomePage's verifyHomePage method if needed)
        const logo = this.page.locator('img[alt="Website for practice automation"]');
        const isVisible = await logo.isVisible();
        if (!isVisible) {
            throw new Error('Home page not visible after clicking Home button');
        }
    }
}

module.exports = ContactUsPage; 