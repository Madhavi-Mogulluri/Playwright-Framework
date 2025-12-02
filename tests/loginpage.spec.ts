import {test,expect} from '../fixtures/baseFixtures';



test('validate login,@login', async ({homepage}) =>{
    
    await expect(homepage.page).toHaveTitle('My Account')
})

test('verify invalid login',{tag:['@sanity', '@smoke' ,'@login']}, async ({loginPage,baseURL}) =>{
    
    await loginPage.NavigateToURL(baseURL);
    await loginPage.doLogin('abc@nal.com','test123');
    await loginPage.getInvalidLoginMsg();
    
})