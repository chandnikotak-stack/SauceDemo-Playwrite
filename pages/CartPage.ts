import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.getByTestId('inventory-item');
    this.pageTitle = page.getByTestId('title');
  }

  // Find a specific item by name
  getCartItem(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
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
