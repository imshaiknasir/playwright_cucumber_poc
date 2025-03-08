const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/login-page');
const { ProductsPage } = require('../../page-objects/products-page');
const { ShoppingCartPage } = require('../../page-objects/shopping-cart-page');
const { CheckoutPage } = require('../../page-objects/checkout-page');
const { CheckoutOverviewPage } = require('../../page-objects/checkout-overview-page');
const { CheckoutCompletePage } = require('../../page-objects/checkout-complete-page');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

Given('I am on the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});

When('I log in with credentials from JSON file using {string} user', async function (userType) {
  // Read the JSON file
  const userDataPath = path.join(__dirname, '../test-data/users.json');
  const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
  
  // Extract credentials based on user type
  const { username, password } = userData.users[userType];
  
  // Use the existing login method with the extracted credentials
  await this.loginPage.login(username, password);
});

When('I log in with credentials from Excel file using {string} user', async function (userType) {
  // Read the Excel file
  const excelPath = path.join(__dirname, '../test-data/users.xlsx');
  const workbook = XLSX.readFile(excelPath);
  
  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert the worksheet to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  // Find the user with the matching userType
  const user = data.find(row => row.userType === userType);
  
  if (!user) {
    throw new Error(`User type "${userType}" not found in Excel file`);
  }
  
  // Use the existing login method with the extracted credentials
  await this.loginPage.login(user.username, user.password);
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