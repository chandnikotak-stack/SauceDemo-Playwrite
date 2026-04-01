import 'dotenv/config';
import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from './pages/LoginPage';
import { USERS, URLS, AUTH_STATE_PATH } from './utils/testData';

// Log in once and save auth state for all tests
async function globalSetup(_config: FullConfig): Promise<void> {
  const authDir = path.join(__dirname, 'playwright', '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: !process.env.PWDEBUG });
  const context = await browser.newContext({ baseURL: URLS.BASE });
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // Save session to reuse across tests
    await context.storageState({ path: AUTH_STATE_PATH });
  } catch (error) {
    console.error('[global-setup] Login failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
