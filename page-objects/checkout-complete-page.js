export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completeHeader = page.getByRole('heading', { name: 'THANK YOU FOR YOUR ORDER' });
    }
} 