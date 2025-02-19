// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ProductsPage } from '../page-objects/products-page';
import { ShoppingCartPage } from '../page-objects/shopping-cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { CheckoutOverviewPage } from '../page-objects/checkout-overview-page';
import { CheckoutCompletePage } from '../page-objects/checkout-complete-page';

test('end-to-end test using POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.productsTitle).toBeVisible();

  // Add items to cart
  await productsPage.addItemToCart('$29.99');
  await expect(page.locator('#contents_wrapper')).toContainText('REMOVE');
  await productsPage.addItemToCart('$9.99');
  await expect(page.locator('#contents_wrapper')).toContainText('REMOVE');

  // Go to cart and checkout
  await productsPage.goToCart();
  await shoppingCartPage.checkout();

  // Fill checkout information
  await checkoutPage.fillCheckoutInformation('Test', 'User', '123456');
  await checkoutPage.continueCheckout();

  // Finish checkout
  await expect(checkoutOverviewPage.finishButton).toBeVisible();
  await checkoutOverviewPage.finishCheckout();

  // Verify order completion
  await expect(checkoutCompletePage.completeHeader).toBeVisible();
});