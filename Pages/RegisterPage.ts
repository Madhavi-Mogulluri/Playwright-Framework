import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js';


export class RegisterPage{

    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMsg: Locator;
    private readonly eleUtil:ElementUtil;
    private readonly logout:Locator;


    constructor(page:Page){

        this.page = page;
        this.eleUtil =  new ElementUtil(page);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' }).first();
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm' });
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        this.agreeCheckbox = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByText('Your Account Has Been Created!', { exact: true });
        this.logout = page.locator('div.list-group a[href $= \'account/logout\']');
    }
    async doRegister(
        firstName:string,
        lastName:string,
        emailId:string,
        telehone:string,
        passwrod:string,
        subscribe:string
    ):Promise<boolean>{

        await this.eleUtil.fill(this.firstNameInput,firstName);
        await this.eleUtil.fill(this.lastNameInput,lastName);
        await this.eleUtil.fill(this.emailInput,emailId);
        await this.eleUtil.fill(this.telephoneInput,telehone);
        await this.eleUtil.fill(this.passwordInput,passwrod);
        await this.eleUtil.fill(this.confirmPasswordInput,passwrod);
        if(subscribe === 'yes'){
            await this.eleUtil.click(this.newsletterYesRadio);

        }
        else{
            await this.eleUtil.click(this.newsletterNoRadio);
        }
        
        await this.eleUtil.click(this.agreeCheckbox);
        await this.eleUtil.click(this.continueButton);
        return await this.eleUtil.isVisible(this.successMsg);
 
    }

    async logoutfromApp():Promise<void>{
        await this.eleUtil.click(this.logout);
    }


}

