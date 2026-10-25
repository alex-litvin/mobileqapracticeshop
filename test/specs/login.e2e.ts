import { expect } from '@wdio/globals'
import Basket from '../pageobjects/basket.page'
import Catalog from '../pageobjects/catalog.page'
import LoginPage from '../pageobjects/login.page'
import loginData from '../../data/login.json'
import CheckoutPage from '../pageobjects/checkout.page'

describe('login', () => {

    before(async() => {
        await Catalog.sortElementsByHighestPrice()
        await Catalog.clickOnFirstProduct()
        await Catalog.clickOnPlusBtn()
        await Catalog.clickOnAddToCardBtn()
        await Basket.clickOnBasketBtn()
        await Basket.clickOnCheckoutBtn()
    });
    it('should show error when fields are empty', async() => {
        await LoginPage.clickLoginBtn()

        await expect(LoginPage.usernameMsgError).toBeDisplayed()
    });

    it('should show error with invalid credentials', async() => {
        await LoginPage.enterData(
            loginData.notvalid.username,
            loginData.notvalid.password
        )
        await LoginPage.clickLoginBtn()
        await expect(LoginPage.providedMsgError).toHaveText('Provided credentials do not match any user in this service.')
    });

    it('should successfuly log in with valid credentials', async() => {
        await LoginPage.enterData(
            loginData.valid.username,
            loginData.valid.password
        )
        await LoginPage.clickLoginBtn()
        
        await expect(CheckoutPage.toPaymentBtn).toBeDisplayed()
    });
});