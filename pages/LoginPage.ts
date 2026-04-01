import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../utils/testData';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
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
}
