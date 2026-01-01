import { expect, Page } from '@playwright/test'
import * as orangeHRMLocators from'../OrangeHRMLocators/OrangeHRMLocatros.json';
import fs from 'fs' 
import path from 'path'
//let locators = path.join(__dirname, 'orangeHRM_Locators/OrangeHRM_Locators.json');
//let orangeHRMLocators = JSON.parse(fs.readFileSync(locators,'utf-8'))
let loginPageLocators = orangeHRMLocators.LoginPage
let dashBoardLocators = orangeHRMLocators.dashBoard
import dotenv from 'dotenv';
import Base from '../OrangeHRM_Utils/OrangeHRMBase';
dotenv.config();
export default class Login extends Base{

    

    async OrangeHRMLogin(page:Page) {
    
        await expect(page).toHaveTitle('OrangeHRM')
        await page.screenshot()
        
    }
    async OrangeHRMLogoff(page:Page)
    {
        await expect(page.locator(dashBoardLocators.userDropdown)).toBeVisible()
        await page.locator(dashBoardLocators.userDropdown).click()
        await page.screenshot()
        await page.getByText(dashBoardLocators.logOff).click()
        await page.waitForTimeout(3000)
    }

}