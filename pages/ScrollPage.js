class ScrollPage {
    constructor(page) {
        this.page = page;
        this.subscriptionText = 'text=SUBSCRIPTION';
        this.scrollUpArrow = '#scrollUp';
        this.fullFledgedText = 'text=Full-Fledged practice website for Automation Engineers';
    }

    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }

    async verifySubscriptionVisible() {
        const isVisible = await this.page.locator(this.subscriptionText).isVisible();
        if (!isVisible) {
            throw new Error('SUBSCRIPTION text not visible');
        }
    }

    async clickScrollUpArrow() {
        await this.page.click(this.scrollUpArrow);
    }

    async verifyFullFledgedTextVisible() {
        const isVisible = await this.page.locator(this.fullFledgedText).isVisible();
        if (!isVisible) {
            throw new Error('Full-Fledged practice website text not visible');
        }
    }
}

module.exports = ScrollPage; 