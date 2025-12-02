import {test,expect} from "../fixtures/baseFixtures";
import { RegisterPage } from "../Pages/RegisterPage";
import {StringUtil} from "../Utils/StringUtils"

test('Register the user', async ({loginPage,baseURL,page}) =>{

   await loginPage.NavigateToURL(baseURL)
    let registerPage:RegisterPage = await loginPage.gotoRegistrationPage()
   let emailid =  await StringUtil.getRandomEmailId()
   let isuserRegistered:boolean =await  registerPage.doRegister('sukumar','shetty',emailid,'9898989898','test123','yes');
    expect(isuserRegistered).toBeTruthy();
    
    
})