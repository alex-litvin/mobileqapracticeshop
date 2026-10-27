import { $ } from '@wdio/globals'

class CheckoutPage{
    public get toPaymentBtn() {return $('~To Payment button')}

    public get fullnameField(){return $('~Full Name* input field')}
    public get address1Field(){return $('~Address Line 1* input field')}
    public get address2Field(){return $('~Address Line 2 input field')}
    public get cityField(){return $('~City* input field')}
    public get stateField(){return $('~State/Region input field')}
    public get zipcodeField(){return $('~Zip Code* input field')}
    public get countryField(){return $('~Country* input field')}

    public get errorMsgCity(){return $('android=new UiSelector().text("Please provide your city.")')}

    public async enterData(fullname:string, address1:string, address2:string, city:string,state:string, zipcode:string,country:string){
        await this.fullnameField.setValue(fullname),
        await this.address1Field.setValue(address1),
        await this.address2Field.setValue(address2),
        await this.cityField.setValue(city),
        await this.stateField.setValue(state),
        await this.zipcodeField.setValue(zipcode),
        await this.countryField.setValue(country)
        
        //await this.loginBtn.click()
    }

    public async clickOnPaymentBtn(){
        await this.toPaymentBtn.waitForDisplayed({timeout:2000}),
        await this.toPaymentBtn.click()
    }


}

export default new CheckoutPage()