import {test,expect, APIResponse} from '@playwright/test';
import {StringUtil} from '../Utils/StringUtils';

const token = '5bae82255d8dd3e8bb494800c89517bf992e712eb996533c5e5eebea98d2caf2';
const baseURL = 'https://gorest.co.in/public/v2/users';

const headers = {
    'Authorization' : `Bearer ${token}`,
    'Content-Type' : 'application/json'

};
const updateBody = {
    gender : 'male'
};
test('get all users', async ({request}) => {

    const response = await request.get(baseURL,{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    });

    expect(response.status()).toBe(200);
    const jsonbody = await response.json();
    console.log(jsonbody);

});


test('POST - create a user', async ({ request }) => {
    
    const requestBody = {
        name: 'PW Test User',
        email: await StringUtil.getRandomEmailId(),
        gender: 'female',
        status: 'active'
    };

    const response = await request.post(baseURL, {
        headers,
        data: requestBody
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
     const userId = data.id;
     console.log(userId);
     // 2. Get the created user

     const responseGet:APIResponse  =await request.get(`https://gorest.co.in/public/v2/users/${userId}`,
        {headers: headers}
    );
    expect(responseGet.status()).toBe(200);
    const reponseId = await responseGet.json();
    expect(reponseId.id).toBe(userId);

    //3 update the same user

   const responsePut = await request.put(`${baseURL}/${userId}`,{
        headers,
        data:updateBody
    });

    expect(responsePut.status()).toBe(200);
    
});