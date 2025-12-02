import{test as base,expect} from '@playwright/test';
import {HomePage} from '../Pages/HomePage';
import {LoginPage} from '../Pages/LoginPage';

type myFixture= {
    homepage:HomePage
    loginPage : LoginPage
}
   


export const test = base.extend<myFixture>({
    loginPage: async ({ page, baseURL }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.NavigateToURL(baseURL);
        await use(loginPage);
    },
    homepage :async ({page,baseURL},use, testInfo)=>{  
        const loginPage = new LoginPage(page);
        await loginPage.NavigateToURL(baseURL);
        
        // Get credentials from project metadata
        const userName = testInfo.project.metadata?.username;
        const password = testInfo.project.metadata?.password;

        if (!userName || !password) {
            throw new Error('Username and password must be provided in project metadata');
        }

        const homepage = await loginPage.doLogin(userName, password);
        
        // Verify successful login
        expect(await homepage.isUserLoggedIn()).toBeTruthy();

        await use(homepage);

    },
        
  
     
});

 
export {expect};


