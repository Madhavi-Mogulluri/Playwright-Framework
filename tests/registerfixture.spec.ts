import {test,expect} from '../fixtures/dataFixture';
import { LoginPage } from '../Pages/LoginPage';
import { StringUtil } from '../Utils/StringUtils';

/**
 * this method of using fixtures not recommended due to performance issue
 * all data sets executed in sequential  mode which will impact time
 * fixtures will supply data only t test method, not to for loop
 */
  test('do user registration', async ({RegData,page,baseURL}) =>{
    for(const user of RegData){
        const loginPage = new LoginPage(page);
        await loginPage.NavigateToURL(baseURL);
       const rp = await loginPage.gotoRegistrationPage();
       const emailId =  await StringUtil.getRandomEmailId();
      const isuserRegistered =  await rp.doRegister(
            user.firstname,
                user.lastname,
                emailId,
                user.phonenumber,
                user.password,
                user.subscribenewsletter
      );
      expect(isuserRegistered).toBeTruthy();
      await rp.logoutfromApp();

    }

  });    
    







