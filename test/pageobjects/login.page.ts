import { $ } from '@wdio/globals'


class LoginPage{

    public get loginHeader(){
        return $('android=new UiSelector().text("Login").instance(0)')
    }  

    public get usernameField(){
        return $('~Username input field')
    } 

    public get passwordField(){
        return $('~Password input field')
    }

    public get loginBtn(){
        return $('~Login button')
    }

    public get providedMsgError(){
        return $('android=new UiSelector().text("Provided credentials do not match any user in this service.")')
    }

    public get usernameMsgError(){
        return $('android=new UiSelector().text("Username is required")')
    }

    
    
    public async getLoginPageHeaderText(){
        let text = await this.loginHeader.getText()
        return text
    }

    public async clickLoginBtn(){
        await (await this.loginBtn).waitForDisplayed({timeout:4000, timeoutMsg:'login btn is not displayed'})
        await this.loginBtn.click()
    }

    public async enterData(username:string, password:string){
        await this.usernameField.setValue(username),
        await this.passwordField.setValue(password)
        //await this.loginBtn.click()
    }

    
}

export default new LoginPage();
