import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../utils/testData';

export class InventoryPage extends BasePage {
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly inventoryItems: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.pageTitle = page.getByTestId('title');
  }

  async goto(): Promise<void> {
    await super.goto(URLS.INVENTORY);
    await this.waitForPageLoad();
  }

  getItemByName(name: string): Locator {
    return this.inventoryItems.filter({ hasText: name });
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.getItemByName(itemName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html', { timeout: 10_000 });
  }

  async assertOnInventoryPage(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
  }
}
