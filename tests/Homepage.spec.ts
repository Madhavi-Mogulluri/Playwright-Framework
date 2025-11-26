import {test,expect} from '../fixtures/baseFixtures'

import { SearchResults } from '../Pages/SearchResultsPage.js';


let searchProducts =[
    {searchKey:'macbook',resultsCount:3},
    {searchKey:'samsung',resultsCount:2},
    {searchKey:'dummy',resultsCount:0}
]


for(let e of searchProducts){

    test(`verify search results with ${e.searchKey}`, async ({homepage}) => {
        
      let rp:SearchResults=  await  homepage.searchProduct(e.searchKey)
    
        expect (await rp.getResultsCount()).toBe(e.resultsCount)
    })

}

    
