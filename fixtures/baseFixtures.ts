import{test as base,expect} from '@playwright/test'
import {HomePage} from '../Pages/HomePage'
import {LoginPage} from '../Pages/LoginPage'

type myFixture= {
    homepage:HomePage
    loginPage : LoginPage
}
   


export const test = base.extend<myFixture>({
    loginPage:async ({page},use) =>{
        const loginPage = new LoginPage(page);
        await use(loginPage)
    },
    homepage :async ({loginPage,baseURL},use, testInfo)=>{  
        await loginPage.NavigateToURL(baseURL)
     const userName =   testInfo.project.metadata.username;
     const password = testInfo.project.metadata.password;

     const homepage = await loginPage.doLogin(userName,password)
     expect(await homepage.isUserLoggedIn()).toBeTruthy;

      await   use(homepage)

    },
        
  
     
})

 
export {expect};


