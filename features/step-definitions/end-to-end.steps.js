const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/login-page');
const { ProductsPage } = require('../../page-objects/products-page');
const { ShoppingCartPage } = require('../../page-objects/shopping-cart-page');
const { CheckoutPage } = require('../../page-objects/checkout-page');
const { CheckoutOverviewPage } = require('../../page-objects/checkout-overview-page');
const { CheckoutCompletePage } = require('../../page-objects/checkout-complete-page');

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

Then('I should be on the products page', async function () {
  this.productsPage = new ProductsPage(this.page);
  await expect(this.productsPage.productsTitle).toBeVisible();
});

When('I add item {string} to the cart', async function (price) {
  await this.productsPage.addItemToCart(price);
});

When('I go to the cart', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.goToCart();
});

When('I proceed to checkout', async function () {
  this.shoppingCartPage = new ShoppingCartPage(this.page);
  await this.shoppingCartPage.checkout();
});

When('I fill checkout information with {string}, {string}, {string}', async function (firstName, lastName, postalCode) {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
});

When('I continue the checkout process', async function () {
  await this.checkoutPage.continueCheckout();
});

When('I finish the checkout', async function () {
  this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
  await this.checkoutOverviewPage.finishCheckout();
});

Then('I should see the order completion message', async function () {
  this.checkoutCompletePage = new CheckoutCompletePage(this.page);
  await expect(this.checkoutCompletePage.completeHeader).toBeVisible();
}); 