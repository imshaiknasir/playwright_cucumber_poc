export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.finishButton = page.getByRole('link', { name: 'FINISH' });
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
} 