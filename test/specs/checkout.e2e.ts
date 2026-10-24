import { expect } from '@wdio/globals'
import Basket from '../pageobjects/basket.page'
import Catalog from '../pageobjects/catalog.page'
import LoginPage from '../pageobjects/login.page'

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

    it.only('should navigate to the login page', async() => {
        await Catalog.sortElementsByHighestPrice()
        await Catalog.clickOnFirstProduct()
        await Catalog.clickOnPlusBtn()
        await Catalog.clickOnAddToCardBtn()
        await Basket.clickOnBasketBtn()
        await Basket.clickOnCheckoutBtn()

        expect(await LoginPage.getLoginPageHeaderText()).toEqual('Login')
    });
});
