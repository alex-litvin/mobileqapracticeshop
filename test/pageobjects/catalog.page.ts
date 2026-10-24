import { $ } from '@wdio/globals'
class Catalog{
    public get sorting() {return $('~sort button')}

    public get basket() {return $('~cart badge')}

    public get sortPriceDesc() {return $('android=new UiSelector().text("Price - Descending")')}

    public get firstProduct() {return $('android=new UiSelector().description("store item").instance(0)')}

    public get plusBtn() {return $('~counter plus button')}

    public get addToCardBtn() {return $('android=new UiSelector().text("Add To Cart")')}


    public async sortElementsByHighestPrice(){
        await this.sorting.waitForDisplayed({timeout:4000, timeoutMsg:'sorting btn is not clickable'})
        await this.sorting.click()

        await this.sortPriceDesc.waitForDisplayed({timeout:4000, timeoutMsg:'sorting price btn is not displayed'})
        await this.sortPriceDesc.click()
    }

    public async clickOnFirstProduct(){
        await this.firstProduct.waitForDisplayed({timeout:4000, timeoutMsg:'first product is not displayed'})
        await this.firstProduct.click()
    }

    public async clickOnPlusBtn(){
        await this.plusBtn.waitForDisplayed({timeout:4000, timeoutMsg:'plus btn is not clickable'})
        await this.plusBtn.click()
    }

    public async clickOnAddToCardBtn(){
        await (await this.addToCardBtn).waitForDisplayed({timeout:4000, timeoutMsg:'add to card btn is not displayed'})
        await this.addToCardBtn.click()
    }

    
}

export default new Catalog()