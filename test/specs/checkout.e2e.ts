import { expect } from '@wdio/globals'
import Basket from '../pageobjects/basket.page'
import Catalog from '../pageobjects/catalog.page'
import LoginPage from '../pageobjects/login.page'
import loginData from '../../data/login.json'
import checkoutData from '../../data/checkout.json'
import CheckoutPage from '../pageobjects/checkout.page'
import BankPage from '../pageobjects/bank.page'

describe('e2e checkout flow&price validation', () => {
    it('should add 2 items to the basket and display correct total count', async() => {
        await Catalog.sortElementsByHighestPrice()
        await Catalog.clickOnFirstProduct()
        await Catalog.clickOnPlusBtn()
        await Catalog.clickOnAddToCardBtn()
        await Basket.clickOnBasketBtn()

        expect(await Basket.getTotalItems()).toEqual('2 items')

    });

    it('should accurately calculate total price', async() => {
        await Catalog.sortElementsByHighestPrice()
        await Catalog.clickOnFirstProduct()
        await Catalog.clickOnPlusBtn()
        await Catalog.clickOnAddToCardBtn()
        await Basket.clickOnBasketBtn()

        expect(await Basket.getTotalPrice()).toEqual('$99.98')
    });

    it('should navigate to the login page', async() => {
        await Catalog.sortElementsByHighestPrice()
        await Catalog.clickOnFirstProduct()
        await Catalog.clickOnPlusBtn()
        await Catalog.clickOnAddToCardBtn()
        await Basket.clickOnBasketBtn()
        await Basket.clickOnCheckoutBtn()

        expect(await LoginPage.getLoginPageHeaderText()).toEqual('Login')
    });
});

describe.only('checkoutpage', () => {
    beforeEach(async() => {
            await driver.reloadSession()
        
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
        });
    it('should submit checkout with valid data', async() => {
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
        await expect(BankPage.checkbox).toHaveAttribute('focusable','true')
    });

    it('should display error when required field is empty', async() => {
        await CheckoutPage.enterData(
            checkoutData.missingcity.fullname,
            checkoutData.missingcity.address1,
            checkoutData.missingcity.address2,
            checkoutData.missingcity.city,
            checkoutData.missingcity.state,
            checkoutData.missingcity.zipcode,
            checkoutData.missingcity.country
        )

        await CheckoutPage.clickOnPaymentBtn()
        await expect (CheckoutPage.errorMsgCity).toBeDisplayed()
    });

    it('should display error with invalid field format', async() => {
        await CheckoutPage.enterData(
            checkoutData.invalidcity.fullname,
            checkoutData.invalidcity.address1,
            checkoutData.invalidcity.address2,
            checkoutData.invalidcity.city,
            checkoutData.invalidcity.state,
            checkoutData.invalidcity.zipcode,
            checkoutData.invalidcity.country
        )

        await CheckoutPage.clickOnPaymentBtn()
        await expect(BankPage.checkbox).toBeDisplayed()
    });
});
