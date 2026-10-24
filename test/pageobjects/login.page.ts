import { $ } from '@wdio/globals'

class LoginPage{

    public get loginHeader(){
        return $('android=new UiSelector().text("Login").instance(0)')
    }  
    
    public async getLoginPageHeaderText(){
        let text = await this.loginHeader.getText()
        return text
    }

    
}

export default new LoginPage();
