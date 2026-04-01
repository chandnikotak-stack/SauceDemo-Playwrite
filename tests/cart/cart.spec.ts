import { test, expect } from '../../fixtures/app.fixture';
import { PRODUCTS } from '../../utils/testData';

// Pre-authenticated via global setup
test.describe('Cart', () => {
  test('should add Sauce Labs Backpack to cart and verify checkout button', async ({
    inventoryPage,
    cartPage,
  }) => {
    // assertOnInventoryPage() already runs inside the inventoryPage fixture

    await inventoryPage.addItemToCart(PRODUCTS.BACKPACK.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertItemInCart(PRODUCTS.BACKPACK.name);
    await expect(cartPage.checkoutButton).toBeEnabled();
  });
});
