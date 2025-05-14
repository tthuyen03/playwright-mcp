const logger = require('../utils/logger');
const ScreenshotUtil = require('../utils/screenshot');

class SignupPage {
    constructor(page) {
        this.page = page;
        this.screenshotUtil = new ScreenshotUtil(page);
        
        // Locators
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
        this.accountCreatedMessage = 'text=ACCOUNT CREATED!';
        this.accountDeletedMessage = 'text=ACCOUNT DELETED!';
        this.continueButton = 'text=Continue';
        this.loggedInMessage = 'text=Logged in as';
        
        // Account details form locators
        this.titleMr = '#id_gender1';
        this.titleMrs = '#id_gender2';
        this.passwordInput = '#password';
        this.daysSelect = '#days';
        this.monthsSelect = '#months';
        this.yearsSelect = '#years';
        this.newsletterCheckbox = '#newsletter';
        this.specialOffersCheckbox = '#optin';
        this.firstNameInput = '#first_name';
        this.lastNameInput = '#last_name';
        this.companyInput = '#company';
        this.address1Input = '#address1';
        this.address2Input = '#address2';
        this.countrySelect = '#country';
        this.stateInput = '#state';
        this.cityInput = '#city';
        this.zipcodeInput = '#zipcode';
        this.mobileNumberInput = '#mobile_number';
        this.createAccountButton = 'button[data-qa="create-account"]';
    }

    async signup(userDetails) {

        // Fill initial signup form
        await this.page.fill(this.nameInput, userDetails.name);
        await this.page.fill(this.emailInput, userDetails.email);
        await this.page.click(this.signupButton);
        
        // Fill account details form
        await this.page.click(this.titleMr);
        await this.page.fill(this.passwordInput, userDetails.password);
        await this.page.selectOption(this.daysSelect, '1');
        await this.page.selectOption(this.monthsSelect, '1');
        await this.page.selectOption(this.yearsSelect, '2000');
        await this.page.check(this.newsletterCheckbox);
        await this.page.check(this.specialOffersCheckbox);
        
        // Fill address information
        await this.page.fill(this.firstNameInput, userDetails.firstName);
        await this.page.fill(this.lastNameInput, userDetails.lastName);
        await this.page.fill(this.companyInput, userDetails.company);
        await this.page.fill(this.address1Input, userDetails.address1);
        await this.page.fill(this.address2Input, userDetails.address2);
        await this.page.selectOption(this.countrySelect, userDetails.country);
        await this.page.fill(this.stateInput, userDetails.state);
        await this.page.fill(this.cityInput, userDetails.city);
        await this.page.fill(this.zipcodeInput, userDetails.zipcode);
        await this.page.fill(this.mobileNumberInput, userDetails.mobileNumber);
        
        await this.page.click(this.createAccountButton);
        await this.screenshotUtil.takeScreenshot('signup_completed');
        logger.info('Signup process completed');
    }

    async verifyAccountCreated() {
        const isVisible = await this.page.locator(this.accountCreatedMessage).isVisible();
        if (!isVisible) {
            throw new Error('Account creation message not visible successfully');
        }
        await this.page.click(this.continueButton);
        await this.screenshotUtil.takeScreenshot('account_created');
        logger.info('Account creation verified successfully');
    }

    async verifyAccountDeleted() {
        logger.info('Verifying account deletion');
        const isVisible = await this.page.locator(this.accountDeletedMessage).isVisible();
        if (!isVisible) {
            throw new Error('Account deletion message not visible successfully');
        }
        await this.page.click(this.continueButton);
        await this.screenshotUtil.takeScreenshot('account_deleted');
        logger.info('Account deletion verified successfully');
    }
}

module.exports = SignupPage; 