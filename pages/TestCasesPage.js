class TestCasesPage {
    constructor(page) {
        this.page = page;
        this.testCasesText = 'text=Test Cases';
    }

    async verifyTestCasesPageVisible() {
        const testCasesElement = this.page.locator(this.testCasesText);
        const isVisible = await testCasesElement.isVisible();
        if (!isVisible) {
            throw new Error('Test Cases page not visible successfully');
        }
    }
}

module.exports = TestCasesPage; 