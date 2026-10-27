import { $ } from '@wdio/globals'

class BankPage{
    public get checkbox(){
        return $('~checkbox for My billing address is the same as my shipping address.')
    }
}

export default new BankPage()