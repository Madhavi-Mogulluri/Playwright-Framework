/* eslint-disable no-empty-pattern */
import {test as base,expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';


type regData = {
    'firstname' :string,
    'lastname' :string,
    'phonenumber':string,
    'password': string,
    'subscribenewsletter': string
}

type csvFixture = {
    RegData:regData[]
}

export const test = base.extend<csvFixture>({
    RegData:async ({},use) =>{
      const fileContent =  fs.readFileSync('./data/register.csv','utf-8');
   const registerData:regData[] =   parse(fileContent,{
        columns:true,
        skip_empty_lines:true
      });
     await use(registerData);

    }
});
export {expect};