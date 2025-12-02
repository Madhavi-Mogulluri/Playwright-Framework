import  {test} from '../fixtures/baseFixtures';

import { ProductInfoPage } from '../Pages/ProductInfoPage.js';

test('verify Product details',{tag:['@smoke','@sanity'],
 annotation:[ 
    {type:'epic:60',description:'verifying product details'},
    {type:'owner',description:'Madhavi Mogulluri'},
    {type:'severity',description:'critical'}
  ]
   
}, async ({homepage}) =>{

    const sp = await homepage.searchProduct('Macbook');
  const pip:ProductInfoPage =  await  sp.selectProduct('Macbook Pro');
   await  pip.getAllProductData('Macbook Pro');
     
});