# SauceDemo Playwright Automation

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com) built with [Playwright](https://playwright.dev/) and TypeScript.

## What It Tests

- Logs in as `standard_user`
- Adds the "Sauce Labs Backpack" to the cart
- Navigates to the cart, verifies the item is present, and checks that the Checkout button is enabled

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/chandnikotak-stack/SauceDemo-Playwrite.git
cd SauceDemo-Playwrite
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

4. **Set up environment variables**

```bash
cp .env.example .env
```

This creates a `.env` file with the demo site credentials. No edits needed — it works out of the box.

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

## Viewing Test Reports

After a test run, open the HTML report:

```bash
npm run report
```

## Project Structure

```
├── fixtures/          # Custom Playwright fixtures (page object injection)
│   └── app.fixture.ts
├── pages/             # Page Object Model classes
│   ├── BasePage.ts    # Abstract base with shared navigation/wait helpers
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/
│   └── cart/
│       └── cart.spec.ts
├── utils/
│   └── testData.ts    # Centralized test data, URLs, and env var config
├── global-setup.ts    # One-time login → saves storageState for all tests
├── playwright.config.ts
└── .env.example
```
├── fixtures/
│   └── app.fixture.ts            # Custom test fixtures
├── pages/
│   ├── BasePage.ts               # Base page object
│   ├── LoginPage.ts              # Login page actions
│   ├── InventoryPage.ts          # Inventory page actions
│   └── CartPage.ts               # Cart page actions
├── utils/
│   └── testData.ts               # Test data and constants
└── tests/
    └── cart/
        └── cart.spec.ts           # Cart test cases
```


