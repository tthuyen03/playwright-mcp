class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cartButton = 'text=Cart';
        this.proceedToCheckoutButton = 'text=Proceed To Checkout';
        this.addressDetails = '.address_details';
        this.reviewOrder = '.review_order';
        this.commentTextArea = 'textarea[name="message"]';
        this.placeOrderButton = 'text=Place Order';
        this.nameOnCardInput = 'input[data-qa="name-on-card"]';
        this.cardNumberInput = 'input[data-qa="card-number"]';
        this.cvcInput = 'input[data-qa="cvc"]';
        this.expirationDateInput = 'input[data-qa="expiry-month"]';
        this.payAndConfirmButton = 'button[data-qa="pay-button"]';
        this.successMessage = 'text=Your order has been placed successfully!';
    }

    async clickCartButton() {
        await this.page.click(this.cartButton);
    }

    async verifyCartPageDisplayed() {
        const isVisible = await this.page.locator(this.cartButton).isVisible();
        if (!isVisible) {
            throw new Error('Cart page not displayed successfully');
        }
    }

    async clickProceedToCheckout() {
        await this.page.click(this.proceedToCheckoutButton);
    }

    async verifyAddressDetailsAndReviewOrder() {
        const addressDetailsVisible = await this.page.locator(this.addressDetails).isVisible();
        const reviewOrderVisible = await this.page.locator(this.reviewOrder).isVisible();
        if (!addressDetailsVisible || !reviewOrderVisible) {
            throw new Error('Address details or review order not visible successfully');
        }
    }

    async enterCommentAndPlaceOrder(comment) {
        await this.page.fill(this.commentTextArea, comment);
        await this.page.click(this.placeOrderButton);
    }

    async enterPaymentDetails(name, cardNumber, cvc, expirationDate) {
        await this.page.fill(this.nameOnCardInput, name);
        await this.page.fill(this.cardNumberInput, cardNumber);
        await this.page.fill(this.cvcInput, cvc);
        await this.page.fill(this.expirationDateInput, expirationDate);
    }

    async clickPayAndConfirmOrder() {
        await this.page.click(this.payAndConfirmButton);
    }

    async verifyOrderPlacedSuccessfully() {
        const isVisible = await this.page.locator(this.successMessage).isVisible();
        if (!isVisible) {
            throw new Error('Order placed successfully message not visible');
        }
    }
}

module.exports = CheckoutPage; 