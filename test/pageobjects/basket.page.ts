import { $ } from '@wdio/globals'

class Basket{
    public get basketBtn() {return $('~cart badge')}

    public get totalItems(){
        return $('android=new UiSelector().text("2 items")')
    }

    public get totalPrice(){
        return $('android=new UiSelector().text("$99.98")')
    }

    public get checkoutBtn() {return $('~Proceed To Checkout button')}

    public async clickOnBasketBtn(){
        await (await this.basketBtn).waitForDisplayed({timeout:4000, timeoutMsg:'basket btn is not displayed'})
        await this.basketBtn.click()
    }

    public async clickOnCheckoutBtn(){
        await (await this.checkoutBtn).waitForDisplayed({timeout:4000, timeoutMsg:'checkout btn is not displayed'})
        await this.checkoutBtn.click()
    }

    public async getTotalItems(){
        let itemsCount = await this.totalItems.getText()
        return itemsCount
    }

    public async getTotalPrice(){
        let priceCount = await this.totalPrice.getText()
        return priceCount
    }
}

export default new Basket()