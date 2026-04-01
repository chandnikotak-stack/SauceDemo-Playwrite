// Test data and config constants
export const AUTH_STATE_PATH = 'playwright/.auth/user.json';

export const USERS = {
  STANDARD: {
    username: process.env.SAUCE_USER ?? 'standard_user',
    password: process.env.SAUCE_PASS ?? 'secret_sauce',
  },
};

export const PRODUCTS = {
  BACKPACK: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
  },
} as const;

export const URLS = {
  BASE: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  LOGIN: '/',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
} as const;
