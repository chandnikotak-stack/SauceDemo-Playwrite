import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../utils/testData';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async goto(): Promise<void> {
    await super.goto(URLS.CART);
    await this.waitForPageLoad();
  }

  // Find a specific item by name
  getCartItem(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html', { timeout: 10_000 });
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItem(itemName: string): Promise<void> {
    const item = this.getCartItem(itemName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForURL('**/inventory.html', { timeout: 10_000 });
  }

  async assertOnCartPage(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async assertItemInCart(itemName: string): Promise<void> {
    const item = this.getCartItem(itemName);
    await expect(item).toBeVisible();
  }
}
