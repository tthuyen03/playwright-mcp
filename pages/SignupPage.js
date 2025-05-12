class SignupPage {
    constructor(page) {
        this.page = page;
        this.signupLoginButton = 'text=Signup / Login';
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
        this.accountCreatedMessage = 'text=ACCOUNT CREATED!';
        this.continueButton = 'text=Continue';
        this.loggedInMessage = 'text=Logged in as';
    }

    async clickSignupLogin() {
        await this.page.click(this.signupLoginButton);
    }

    async fillSignupDetails(name, email) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.signupButton);
    }

    async verifyAccountCreated() {
        const isVisible = await this.page.locator(this.accountCreatedMessage).isVisible();
        if (!isVisible) {
            throw new Error('Account creation message not visible successfully');
        }
        await this.page.click(this.continueButton);
    }

    async verifyLoggedInAs(username) {
        const loggedInText = await this.page.locator(this.loggedInMessage).textContent();
        if (!loggedInText.includes(username)) {
            throw new Error(`Expected to be logged in as ${username}, but found ${loggedInText}`);
        }
    }
}

module.exports = SignupPage; 