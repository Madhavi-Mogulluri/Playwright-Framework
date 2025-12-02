import {test,expect} from '../fixtures/baseFixtures';
import { RegisterPage } from '../Pages/RegisterPage';
import {StringUtil} from '../Utils/StringUtils';

test('Register the user', async ({loginPage,baseURL}) =>{

   await loginPage.NavigateToURL(baseURL);
    const registerPage:RegisterPage = await loginPage.gotoRegistrationPage();
   const emailid =  await StringUtil.getRandomEmailId();
   const isuserRegistered:boolean =await  registerPage.doRegister('sukumar','shetty',emailid,'9898989898','test123','yes');
    expect(isuserRegistered).toBeTruthy();
    
    
});