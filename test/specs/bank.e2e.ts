import { expect } from '@wdio/globals'
import Basket from '../pageobjects/basket.page'
import Catalog from '../pageobjects/catalog.page'
import LoginPage from '../pageobjects/login.page'
import loginData from '../../data/login.json'
import checkoutData from '../../data/checkout.json'
import CheckoutPage from '../pageobjects/checkout.page'
import BankPage from '../pageobjects/bank.page'
import bankData from '../../data/bank.json'

describe('bank/finish', () => {
    before(async() => {
            //await driver.reloadSession()
        
            await Catalog.sortElementsByHighestPrice()
            await Catalog.clickOnFirstProduct()
            await Catalog.clickOnPlusBtn()
            await Catalog.clickOnAddToCardBtn()
            await Basket.clickOnBasketBtn()
            await Basket.clickOnCheckoutBtn()
            await LoginPage.enterData(
                loginData.valid.username,
                loginData.valid.password
            )
        await LoginPage.clickLoginBtn()
        await CheckoutPage.enterData(
            checkoutData.valid.fullname,
            checkoutData.valid.address1,
            checkoutData.valid.address2,
            checkoutData.valid.city,
            checkoutData.valid.state,
            checkoutData.valid.zipcode,
            checkoutData.valid.country
        )

        await CheckoutPage.clickOnPaymentBtn()
        });

    it('should display "Value looks invalid" error for incorrect expiration date', async() => {
        await BankPage.enterDataCard(
            bankData.notvalidCard.fullName,
            bankData.notvalidCard.number,
            bankData.notvalidCard.expiration,
            bankData.notvalidCard.securityCode,           
        )

        //await BankPage.clickOnReviewOrderBtn()
        await expect(BankPage.errorMsg).toHaveText('Value looks invalid.')
    });

    it.only('should successfully process payment', async() => {
        await BankPage.enterDataCard(
            bankData.validCard.fullName,
            bankData.validCard.number,
            bankData.validCard.expiration,
            bankData.validCard.securityCode,           
        )

        await driver.background(4)

        await expect(BankPage.cardnumberField).toHaveText('4242 4242 4242 4242')

        await BankPage.clickOnReviewOrderBtn()
        await BankPage.clickOnOrderBtn()
        await expect(BankPage.checkoutCompleteMsg).toBeDisplayed()

        await browser.saveScreenshot('./screenshoots/complete.png')
    });
});