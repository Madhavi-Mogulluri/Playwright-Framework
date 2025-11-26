import {Locator, Page, test} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js'
import {SearchResults} from './SearchResultsPage.js'
import { LoginPage } from './LoginPage.js';

//1. locators and objects/object Repositories
export class HomePage {

    private readonly logoutLink:Locator;
     readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly search:Locator;
    private readonly searchIcon:Locator;
    private readonly loginLink:Locator;

    //2. initialize the varibale by constructor

    constructor (page:Page){
       this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.search = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('.fa.fa-search')
        this.loginLink = page.getByRole('link', { name: 'Login' });
    }
   // 3. write actions in the same page class
/**
 * checks login is successful
 */
   async isUserLoggedIn():Promise<boolean>{
    return await this.eleUtil.isVisible(this.logoutLink)
   }

   async logOut():Promise<LoginPage>{
    await this.eleUtil.click(this.logoutLink)
    await this.eleUtil.click(this.loginLink)

    return new LoginPage(this.page)
   }

   async searchProduct(searchKey:string):Promise<SearchResults>{
    console.log(`search key is ${searchKey}`);
    await this.eleUtil.fill(this.search,searchKey)
    await this.eleUtil.click(this.searchIcon)
    return new SearchResults(this.page);
   }

}