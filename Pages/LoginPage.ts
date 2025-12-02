import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js';
import {HomePage} from '../Pages/HomePage.js';
import {RegisterPage} from '../Pages/RegisterPage.js';
    
export class LoginPage{

    private readonly page: Page;
    private readonly eleUtil:ElementUtil;
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly submitbtn:Locator;
    private readonly warningMsg:Locator;
    private readonly registerLink :Locator;

    constructor(page:Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.submitbtn = page.getByRole('button', { name: 'Login' });
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.locator('div.list-group a[href$= \'account/register\']');
    }

    async NavigateToURL(baseURL:string|undefined){
       await  this.page.goto( baseURL +'?route=account/login');
    } 

    async doLogin(email:string,password:string):Promise<HomePage> {
      await  this.eleUtil.fill(this.emailId,email);
      await  this.eleUtil.fill(this.password,password);
      await this.eleUtil.click(this.submitbtn);
      return new HomePage(this.page);
    }

    async getInvalidLoginMsg():Promise<string>{
       const msg =  await this.eleUtil.saveText(this.warningMsg);
    console.log(msg);
    return msg;
    
    }
    async gotoRegistrationPage() :Promise<RegisterPage>{
      await this.eleUtil.click(this.registerLink);

      return new RegisterPage(this.page);
    }



}