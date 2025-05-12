class LoginPage {
    constructor(page) {
        this.page = page;
        this.signupLoginButton = 'text=Signup / Login';
        this.emailInput = 'input[data-qa="login-email"]';
        this.passwordInput = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.loggedInMessage = 'text=Logged in as';
    }

    async clickSignupLogin() {
        await this.page.click(this.signupLoginButton);
    }

    async fillLoginDetails(email, password) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async verifyLoggedInAs(username) {
        const loggedInText = await this.page.locator(this.loggedInMessage).textContent();
        if (!loggedInText.includes(username)) {
            throw new Error(`Expected to be logged in as ${username}, but found ${loggedInText}`);
        }
    }
}

module.exports = LoginPage; 