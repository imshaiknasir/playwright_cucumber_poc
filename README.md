# E2E Test Automation with Playwright and Cucumber

This project demonstrates end-to-end test automation using Playwright and Cucumber for the Sauce Demo application. It implements the Page Object Model pattern for better maintainability and reusability.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Project Setup

1. Clone the repository
```bash
git clone <repository-url>
cd poc
```

2. Install dependencies
```bash
npm install
```

## Running Tests

To run all tests:
```bash
npm test
```

## Project Structure

```
├── features/
│   ├── support/           # Support files for Cucumber
│   ├── step-definitions/ # Step definition files
│   └── end-to-end.feature # Feature files containing test scenarios
├── page-objects/         # Page Object Model implementations
│   ├── login-page.js
│   ├── products-page.js
│   ├── shopping-cart-page.js
│   ├── checkout-page.js
│   ├── checkout-overview-page.js
│   └── checkout-complete-page.js
└── tests/
    └── end-to-end.spec.js # Playwright test specifications
```

## Technical Architecture

### How the Code is Interconnected

1. **Feature Files (`features/*.feature`)**
   - Written in Gherkin syntax
   - Define test scenarios in human-readable format
   - Example: `end-to-end.feature` describes the complete purchase flow

2. **Step Definitions (`features/step-definitions/`)**
   - Bridge between Gherkin steps and actual test code
   - Map natural language steps to JavaScript functions
   - Utilize page objects to interact with the application

3. **Page Objects (`page-objects/`)**
   - Implement the Page Object Model pattern
   - Each page has its own class with relevant selectors and methods
   - Files:
     - `login-page.js`: Handles login functionality
     - `products-page.js`: Manages product listing and selection
     - `shopping-cart-page.js`: Cart operations
     - `checkout-page.js`: Checkout form handling
     - `checkout-overview-page.js`: Order review
     - `checkout-complete-page.js`: Order confirmation

4. **Configuration**
   - `playwright.config.js`: Configures Playwright settings
     - Base URL: https://www.saucedemo.com/v1/
     - Test directory and patterns
     - Browser configurations

5. **Test Specifications (`tests/`)**
   - Contains Playwright-specific test files
   - `end-to-end.spec.js`: Implements E2E test scenarios

## Test Flow

1. User logs in with credentials
2. Adds items to cart
3. Proceeds to checkout
4. Fills in shipping information
5. Reviews and completes order
6. Verifies order completion

## Best Practices Implemented

1. Page Object Model for better maintainability
2. Cucumber for behavior-driven development
3. Clear separation of concerns
4. Reusable page objects
5. Configuration management
6. Structured project organization 