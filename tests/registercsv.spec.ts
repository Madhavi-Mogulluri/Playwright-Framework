import {test,expect} from '../fixtures/baseFixtures';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import { StringUtil } from '../Utils/StringUtils';

type regData = {
    'firstname' :string,
    'lastname' :string,
    'phonenumber':string,
    'password': string,
    'subscribenewsletter': string
}

const fileContent = fs.readFileSync('./data/register.csv','utf-8');
const registrationData:regData[] =parse(fileContent,{
    columns:true,
    skip_empty_lines:true
});

for(const user of registrationData){

    test(`do user registration of ${user.firstname}`, async ({loginPage,baseURL}) =>{
       await  loginPage.NavigateToURL(baseURL);
       const rp = await loginPage.gotoRegistrationPage();
      const emailId =  await StringUtil.getRandomEmailId();
    const userregistered:boolean =   await  rp.doRegister(user.firstname,user.lastname,emailId,user.password,
                            user.phonenumber,user.subscribenewsletter);
         expect(userregistered).toBeTruthy();


    });
}

