import {test,expect} from "../fixtures/baseFixtures"
import fs from 'fs'
import {parse} from 'csv-parse/sync'
import { StringUtil } from "../Utils/StringUtils"

type regData = {
    "firstname" :string,
    "lastname" :string,
    "phonenumber":string,
    "password": string,
    "subscribenewsletter": string
}

let fileContent = fs.readFileSync('./data/register.csv','utf-8')
let registrationData:regData[] =parse(fileContent,{
    columns:true,
    skip_empty_lines:true
})

for(let user of registrationData){

    test(`do user registration of ${user.firstname}`, async ({loginPage,baseURL}) =>{
       await  loginPage.NavigateToURL(baseURL)
       let rp = await loginPage.gotoRegistrationPage()
      let emailId =  await StringUtil.getRandomEmailId()
    let userregistered:boolean =   await  rp.doRegister(user.firstname,user.lastname,emailId,user.password,
                            user.phonenumber,user.subscribenewsletter)
         expect(userregistered).toBeTruthy();


    })
}

