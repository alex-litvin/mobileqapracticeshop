import { $ } from '@wdio/globals'

class CheckoutPage{
    public get toPaymentBtn() {return $('~To Payment button')}
}

export default new CheckoutPage()