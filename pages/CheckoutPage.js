const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.proceedToCheckoutButton = 'text=Proceed To Checkout';
        this.deliveryAddress = '#address_delivery';
        this.billingAddress = '#address_invoice';
    }

    async clickProceedToCheckout() {
        await this.page.waitForSelector(this.proceedToCheckoutButton, { timeout: 5000 });
        await this.page.click(this.proceedToCheckoutButton);
    }
    

    async verifyAddress(expectedAddress) {
        await this.page.waitForSelector(this.billingAddress);

        const rawActual = await this.page.locator(this.billingAddress).innerText();

        const normalize = (text) =>
            text
                .split('\n')
                .map(line => line.trim())
                .filter(line =>
                    line && !line.toLowerCase().includes('your ')
                )
                .join(' ')
                .replace(/\s+/g, ' ') // gộp khoảng trắng
                .toLowerCase()
                .replace(/^mr\.?\s|^mrs\.?\s|^ms\.?\s/, ''); // loại bỏ danh xưng ở đầu

        const actualNormalized = normalize(rawActual);
        const expectedNormalized = normalize(expectedAddress);

        if (actualNormalized !== expectedNormalized) {
            throw new Error(`Delivery address mismatch.\nExpected:\n${expectedNormalized}\n\nFound:\n${actualNormalized}`);
        }

        await this.screenshotUtil.takeScreenshot('billing_address_verification');
        console.log('Delivery address matches expected');
    }
    
    
    

    async verifyBillingAddress(expectedAddress) {
        logger.info('Verifying billing address');
        const billingAddressElement = await this.page.locator(this.billingAddress);
        const addressText = await billingAddressElement.textContent();
        
        // Verify each part of the address
        const addressParts = expectedAddress.split('\n');
        for (const part of addressParts) {
            if (!addressText.includes(part.trim())) {
                throw new Error(`Billing address mismatch. Expected: ${part}, Found: ${addressText}`);
            }
        }
        
        await this.screenshotUtil.takeScreenshot('billing_address_verification');
        logger.info('Successfully verified billing address');
    }
}

module.exports = CheckoutPage; 