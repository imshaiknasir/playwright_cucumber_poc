export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.getByText('Products');
    }

    async addItemToCart(price) {
        await this.page.locator('div').filter({ hasText: new RegExp(`^\\${price}ADD TO CART$`) }).getByRole('button').click();
    }

    async goToCart() {
        await this.page.getByRole('link', { name: '2' }).click();
    }
} 