class LoginPage {
  get buttonLogin() { return $('[data-test="login-button"]'); }
  get errorMessage() { return $('[data-test="error"]'); }
  get errorMessageCloseButton() { return $('.error-button'); }
  get inputPassword() { return $('[data-test="password"]'); }
  get inputUsername() { return $('[data-test="username"]'); }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.buttonLogin.click();
  }

  async validateErrorMessage(message) {
    if (!message) {
      return;
    }
    
    await expect(this.errorMessage).toHaveText(message);
  }
}

export default LoginPage;
