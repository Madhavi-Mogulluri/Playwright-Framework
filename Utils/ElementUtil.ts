import { Locator, Page, expect } from '@playwright/test'

type flexibleLocator = string | Locator;

export class ElementUtil {


    private page: Page;

    private defaultTimeout: number = 30000

    constructor(page: Page, timeout: number = 30000) {
        this.page = page
        this.defaultTimeout = timeout
    }
    /**
      * this method will convert the string to locator or else return the semnatic based locators
      * @param locator 
      * @returns 
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else {
                return this.page.locator(locator).first();
            }

        }
        else {
            if (index) {
                return locator.nth(index);
            }
            else {
                return locator.first();
            }

        }
    }
    /**
     * click on the given element
     * @param locator 
     * @param options 
     */
    async click(locator: flexibleLocator, options?: { force: boolean, timeout: number }, index?: number): Promise<void> {
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeout

        })
        console.log(`clicked on the ${locator}`);
    }
    /**
     * do a right click on the element
     * @param locator 
     * @param options 
     */
    async rightclick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({
            button: 'right'
        })
    }
    /**
     * double click on the element
     * @param locator 
     */
    async doubleClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).dblclick({ timeout: this.defaultTimeout })
    }
    /**
     * fill the text in to the given element
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string, index?: number): Promise<void> {
        await this.getLocator(locator, index).fill(text, { timeout: this.defaultTimeout })
        console.log(`filled the ${text} in to the element ${locator}`);
    }
    /**
     * mimics human typing
     * @param locator 
     * @param text 
     */
    async pressSequentially(locator: flexibleLocator, text: string): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay: 500 })
        console.log(`typed the ${text} in the ${locator}`);
    }
    /**
     * slect the drop down by using value
     * @param locator 
     * @param value 
     */
    async selectDropdownByValue(locator: flexibleLocator, value: string): Promise<void> {
        await this.getLocator(locator).selectOption({ value: value })
        console.log(`select the dropdown alue from ${locator} by using ${value}`);
    }
    /**
     * slect the drop down by using label
     * @param locator 
     * @param value 
     */
    async selectDropdownBylabel(locator: flexibleLocator, label: string): Promise<void> {
        await this.getLocator(locator).selectOption({ label: label })
        console.log(`select the dropdown alue from ${locator} by using ${label}`);
    }
    /**
     * slect the drop down by using index
     * @param locator 
     * @param value 
     */
    async selectDropdownByindex(locator: flexibleLocator, index: number): Promise<void> {
        await this.getLocator(locator).selectOption({ index: index })
        console.log(`select the dropdown alue from ${locator} by using ${index}`);
    }
    /**
     * clears the input value in any given text box
     * @param locator 
     */
    async clearText(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear()
        console.log(`clear the exisisting text in the given ${locator}`);
    }
    /**
     * get the entered value in the text box
     * @param locator 
     * @returns 
     */
    async getText(locator: flexibleLocator): Promise<string> {
        return await this.getLocator(locator).inputValue()
    }
    /**
     * user should provide attribue associated with the locator, this method fetches its value
     * @param locator 
     * @param attribute 
     * @returns 
     */
    async getArrtibuteValue(locator: flexibleLocator, attribute: string): Promise<String | null> {
        return await this.getLocator(locator).getAttribute(attribute)
    }
    /**
     * this method returns the innertexts of multiple elements
     * @param locator 
     * @returns 
     */
    async getAllInnertexts(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts()
    }
    /**
     * get the actual text of the locator
     * @param locator 
     * @returns 
     */
    async saveText(locator: flexibleLocator): Promise<string> {
        return await this.getLocator(locator).innerText({ timeout: this.defaultTimeout })
    }
    /**
 * get the actual text and hidden  of the locator and child elements also
 * @param locator 
 * @returns text of the locator
 */
    async saveallText(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).textContent({ timeout: this.defaultTimeout })
    }
    /**
     * get all locators
     * @param locator 
     * @returns 
     */
    async getallElements(locator: flexibleLocator): Promise<Locator[]> {
        return await this.getLocator(locator).all()
    }

    //********** ASSertions************ */
    /**
     * check the visibility of the element and it will wait till timeout
     * @param locator 
     */
    async isVisibleEcho(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).waitFor({ state: 'visible', timeout: this.defaultTimeout })
    }
    /**
    * check the visibility of the element
    * @param locator 
    */
    async isVisible(locator: flexibleLocator): Promise<boolean> {
       return await this.getLocator(locator).isVisible();
    }
    /**
     * element should not be visible in dom
     * @param locator 
     */
    async isNotVisible(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).toBeHidden()
    }
    /**
 * element should be in disabled state
 * @param locator 
 */
    async isDisabled(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).toBeDisabled()
    }
    /**
     * verify thecheckbox state
     * @param locator 
     */
    async ischecked(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).toBeChecked()
    }
    /**
    * verify thecheckbox state to be unchecked
    * @param locator 
    */
    async isUnchecked(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).not.toBeChecked()
    }
    /**
    * checks user able to type
    * @param locator 
    */
    async isEditable(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).toBeEditable()
    }
    /**
 * element is not editable
 * @param locator 
 */
    async isNotEditable(locator: flexibleLocator): Promise<void> {
        await expect(this.getLocator(locator)).not.toBeEditable()
    }


    //*****Page methods*/
    /**
     * it will wait until the url loaded
     * @param url 
     */
    async waitforURL(url: string): Promise<void> {
        await this.page.waitForURL(url, { waitUntil: 'load' })
        console.log(`waited till the url loaded on the tab`);
    }
    /**
     * 
     * @returns the page title
     */
    async getTitle(): Promise<string> {
        return this.page.title()
    }
    /**
     * equal to thread.sleep
     * @param timeout 
     */
    async sleep(timeout: number): Promise<void> {
        this.page.waitForTimeout(timeout)
    }

}