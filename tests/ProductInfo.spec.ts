import  {test} from '../fixtures/baseFixtures';

import { ProductInfoPage } from '../Pages/ProductInfoPage.js';

test('verify Product details',{tag:['@smoke','@sanity'],
 annotation:[ 
    {type:'epic:60',description:'verifying product details'},
    {type:'owner',description:'Madhavi Mogulluri'},
    {type:'severity',description:'critical'}
  ]
   
}, async ({homepage}) =>{

    let sp = await homepage.searchProduct('Macbook')
  let pip:ProductInfoPage =  await  sp.selectProduct('Macbook Pro')
   await  pip.getAllProductData('Macbook Pro')
     
})