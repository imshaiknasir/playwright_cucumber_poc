export class ShoppingCartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole('link', { name: 'CHECKOUT' });
    }

    async checkout() {
        await this.checkoutButton.click();
    }
} 