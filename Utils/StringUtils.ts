
export class StringUtil{

    static async getRandomEmailId():Promise<string>{
       
      let randomValue =   Math.random().toString(36).substring(2,9)
      return `automation_${randomValue}@nal.com`
    }

}