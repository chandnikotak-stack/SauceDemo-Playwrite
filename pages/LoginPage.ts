import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../utils/testData';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto(): Promise<void> {
    await super.goto(URLS.LOGIN);
    await this.waitForPageLoad();
  }

  // Fill credentials and wait for redirect
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/inventory.html', { timeout: 10_000 });
  }

  // Login that expects failure
  async loginExpectingError(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.errorMessage).toBeVisible();
  }

  async assertOnLoginPage(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async assertErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }
}
