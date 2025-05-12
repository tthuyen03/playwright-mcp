const { chromium } = require('playwright');

// Page Object Model for Home Page
class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginButton = 'text=Signup / Login';
    }

    async navigate() {
        await this.page.goto('http://automationexercise.com');
    }

    async verifyHomePage() {
        await this.page.waitForSelector('title');
        const title = await this.page.title();
        if (!title.includes('Automation Exercise')) {
            throw new Error('Home page not visible successfully');
        }
    }

    async clickSignupLogin() {
        await this.page.click(this.signupLoginButton);
    }
}

// Page Object Model for Signup Page
class SignupPage {
    constructor(page) {
        this.page = page;
        this.newUserSignupText = 'text=New User Signup!';
        this.nameInput = 'input[name="name"]';
        this.emailInput = 'input[name="email"]';
        this.signupButton = 'button:has-text("Signup")';
    }

    async verifyNewUserSignupVisible() {
        await this.page.waitForSelector(this.newUserSignupText);
    }

    async enterNameAndEmail(name, email) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
    }

    async clickSignup() {
        await this.page.click(this.signupButton);
    }
}

// Page Object Model for Account Information Page
class AccountInformationPage {
    constructor(page) {
        this.page = page;
        this.enterAccountInfoText = 'text=Enter Account Information';
        this.titleRadioButton = '#id_gender1';
        this.passwordInput = '#password';
        this.daysDropdown = '#days';
        this.monthsDropdown = '#months';
        this.yearsDropdown = '#years';
        this.newsletterCheckbox = '#newsletter';
        this.optinCheckbox = '#optin';
        this.firstNameInput = '#first_name';
        this.lastNameInput = '#last_name';
        this.companyInput = '#company';
        this.address1Input = '#address1';
        this.address2Input = '#address2';
        this.countryDropdown = '#country';
        this.stateInput = '#state';
        this.cityInput = '#city';
        this.zipcodeInput = '#zipcode';
        this.mobileNumberInput = '#mobile_number';
        this.createAccountButton = 'button:has-text("Create Account")';
    }

    async verifyEnterAccountInfoVisible() {
        await this.page.waitForSelector(this.enterAccountInfoText);
    }

    async fillAccountDetails(details) {
        await this.page.check(this.titleRadioButton);
        await this.page.fill(this.passwordInput, details.password);
        await this.page.selectOption(this.daysDropdown, details.day);
        await this.page.selectOption(this.monthsDropdown, details.month);
        await this.page.selectOption(this.yearsDropdown, details.year);
        await this.page.check(this.newsletterCheckbox);
        await this.page.check(this.optinCheckbox);
        await this.page.fill(this.firstNameInput, details.firstName);
        await this.page.fill(this.lastNameInput, details.lastName);
        await this.page.fill(this.companyInput, details.company);
        await this.page.fill(this.address1Input, details.address1);
        await this.page.fill(this.address2Input, details.address2);
        await this.page.selectOption(this.countryDropdown, details.country);
        await this.page.fill(this.stateInput, details.state);
        await this.page.fill(this.cityInput, details.city);
        await this.page.fill(this.zipcodeInput, details.zipcode);
        await this.page.fill(this.mobileNumberInput, details.mobileNumber);
    }

    async clickCreateAccount() {
        await this.page.click(this.createAccountButton);
    }
}

// Main Test Execution
(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const accountInfoPage = new AccountInformationPage(page);

    try {
        // Step 1: Navigate to URL
        await homePage.navigate();

        // Step 2: Verify that home page is visible successfully
        await homePage.verifyHomePage();

        // Step 3: Click on 'Signup / Login' button
        await homePage.clickSignupLogin();

        // Step 4: Verify 'New User Signup!' is visible
        await signupPage.verifyNewUserSignupVisible();

        // Step 5: Enter name and email address
        await signupPage.enterNameAndEmail('Test User', 'testuser@example.com');

        // Step 6: Click 'Signup' button
        await signupPage.clickSignup();

        // Step 7: Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await accountInfoPage.verifyEnterAccountInfoVisible();

        // Step 8: Fill details and create account
        const accountDetails = {
            password: 'password123',
            day: '1',
            month: '1',
            year: '2000',
            firstName: 'Test',
            lastName: 'User',
            company: 'Test Company',
            address1: '123 Test Street',
            address2: 'Suite 456',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobileNumber: '1234567890'
        };
        await accountInfoPage.fillAccountDetails(accountDetails);
        await accountInfoPage.clickCreateAccount();

        // Step 9: Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await page.waitForSelector('text=Account Created!');
        await page.click('text=Continue');

        // Step 10: Verify 'Logged in as username' is visible
        await page.waitForSelector('text=Logged in as');

        // Step 11: Click 'Delete Account' button
        await page.click('text=Delete Account');

        // Step 12: Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await page.waitForSelector('text=Account Deleted!');
        await page.click('text=Continue');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
