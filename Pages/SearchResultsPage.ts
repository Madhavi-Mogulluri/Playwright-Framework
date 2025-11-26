import {Locator, Page, test} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js'
import { ProductInfoPage} from './ProductInfoPage.js';


//1. locators and objects/object Repositories
export class SearchResults {
 private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly results:Locator;

   
    //2. initialize the varibale by constructor

    constructor (page:Page){
       this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator(`.product-thumb`)
        
    }
   // 3. write actions in the same page class
/**
 * 
 * @returns count of products
 */
   async getResultsCount():Promise<number>{
    return await this.results.count();
   }

   async selectProduct(productName:string):Promise<ProductInfoPage>{
      await this.eleUtil.click(this.page.getByRole('link',{name:`${productName}`}));
      return new ProductInfoPage(this.page);

   }

}