import { $ } from '@wdio/globals'

class BankPage{
    public get checkbox(){
        return $('~checkbox for My billing address is the same as my shipping address.')
    }

    public get fullnameField(){
        return $('~Full Name* input field')
    }

    public get cardnumberField(){
        return $('~Card Number* input field')
    }

    public get expirationDataField(){
        return $('~Expiration Date* input field')
    }

    public get securitycodeField(){
        return $('~Security Code* input field')
    }

    public get reviewOrderBtn(){
        return $('~Review Order button')
    }

    public get errorMsg(){
        return $('android=new UiSelector().text("Value looks invalid.")')
    }   


    public get placeOrderBtn(){
        return $('~Place Order button')
    }

    public get checkoutCompleteMsg(){
        return $('android=new UiSelector().text("Checkout Complete")')
    }

    public async clickOnReviewOrderBtn(){
        await this.reviewOrderBtn.waitForDisplayed({timeout:5000})
        await this.reviewOrderBtn.click()
    }

    public async clickOnOrderBtn(){
        await this.placeOrderBtn.waitForDisplayed({timeout:5000})
        await this.placeOrderBtn.click()
    }

    public async enterDataCard(fullName:string, number:string, expiration:string, securityCode:string){
        await this.fullnameField.waitForDisplayed()
        await this.fullnameField.setValue(fullName),
        await this.cardnumberField.setValue(number),
        await this.expirationDataField.setValue(expiration),
        await this.securitycodeField.setValue(securityCode)
       
    }
}

export default new BankPage()