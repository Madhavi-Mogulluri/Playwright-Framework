import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../Utils/ElementUtil.js'

export class ProductInfoPage {
    ProductMap = new Map<string,string|number|null>();

    private readonly page :Page;
    private readonly eleUtil:ElementUtil;
    private readonly imagesCount:Locator;
    private readonly productMetadata:Locator;
    private readonly productPrice:Locator;
    private readonly headerelement:Locator;

    constructor(page:Page){
        this.page = page;
        this.eleUtil  = new ElementUtil(page);
        this.imagesCount = page.locator('div#content img')
        this.productMetadata = page.locator(`(//h1/../ul)[1]/li`)
        this.productPrice = page.locator(`(//h1/../ul)[2]/li`)
        this.headerelement = page.locator('h1')

    }

   private async getProductHeader():Promise<string>{
        const header = await this.eleUtil.saveText(this.headerelement)
        console.log(`product header is :` + header);
      return header.trim()
    }
    private async getImagesCount():Promise<number>{
        let imagesCount =await this.imagesCount.count();
        console.log(`number of images for ${await this.getProductHeader()} is `+imagesCount);
        return imagesCount;
    }
    private async getProductMetadata():Promise<string[]>{
        return await this.eleUtil.getAllInnertexts(this.productMetadata)
    }
    private async getProductPrice():Promise<string[]>{
        return await this.eleUtil.getAllInnertexts(this.productPrice)
    }

    async getAllProductData(productName:string){
       let header = await this.getProductHeader();
       console.log(`Product header is:` +header);
       this.ProductMap.set('header',header)
       let imageNumber =  await this.getImagesCount();
       console.log(`no of images are :`+imageNumber);
       this.ProductMap.set('count',imageNumber)
       let metadata = await this.getProductMetadata();
        console.log(metadata);
        for(let e of metadata){
          let data =  e.split(':')
            this.ProductMap.set('data[0]',data[1])
        }
        let price = await this.getProductPrice()
        console.log(price);
    }

}