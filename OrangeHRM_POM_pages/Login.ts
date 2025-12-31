import { expect, Page } from '@playwright/test'
import * as orangeHRMLocators from'../orangeHRM_Locators/OrangeHRM_Locatros.json';
let loginPageLocators = orangeHRMLocators.LoginPage
let dashBoardLocators = orangeHRMLocators.dashBoard
import dotenv from 'dotenv';
dotenv.config();
export default class Login {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async OrangeHRMLogin() {
        const url: string = process.env.url ?? ''
        const username: string = process.env.orangehrmusername ?? ''
        const password: string = process.env.orangehrmpassword ?? ''
        await this.page.goto(url)
        await this.page.waitForLoadState('networkidle')
        await this.page.getByPlaceholder(loginPageLocators.usernametxt).fill(username)
        await this.page.getByPlaceholder(loginPageLocators.passwordtxt).fill(password)
        await this.page.getByRole('button', { name: loginPageLocators.Loginbtn }).click()
        await expect(this.page).toHaveTitle('OrangeHRM')
        await this.page.screenshot()
        
    }
    async OrangeHRMLogoff()
    {
        await expect(this.page.locator(dashBoardLocators.userDropdown)).toBeVisible()
        await this.page.locator(dashBoardLocators.userDropdown).click()
        await this.page.screenshot()
        await this.page.getByText(dashBoardLocators.logOff).click()
        await this.page.waitForTimeout(3000)
    }

}