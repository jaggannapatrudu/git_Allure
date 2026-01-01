import {BrowserContext,Page,chromium} from '@playwright/test'
import * as orangeHRMLocators from'../OrangeHRMLocators/OrangeHRMLocatros.json';
let loginPageLocators = orangeHRMLocators.LoginPage
import dotenv from 'dotenv'
dotenv.config();
export default class Base {
    
    
    async urlLaunch(page:Page)
    {
        const url: string = process.env.url ?? ''
        await page.goto(url)
    }
    async storageState():Promise<Page>
    {
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
         const url: string = process.env.url ?? ''
        const username: string = process.env.orangehrmusername ?? ''
        const password: string = process.env.orangehrmpassword ?? ''
        await page.goto(url)
        await page.waitForLoadState('networkidle')
        await page.getByPlaceholder(loginPageLocators.usernametxt).fill(username)
        await page.getByPlaceholder(loginPageLocators.passwordtxt).fill(password)
        await page.getByRole('button', { name: loginPageLocators.Loginbtn }).click()
        await context.storageState({path:'storagestate.json'})
        //const newContext = await browser.newContext({storageState:'storagestate.json'})
        return page
    }
    randomTextGeneration(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzfakhbldsjvdbsadabdvsavbdsavdsdasds';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }
    randomNumberGeneration(): number {
        let number = Math.floor(Math.random() * 9000000)
        return number
    }
    passwordGenerator(): string {
        let uText = 'GJDSFHSGFHLGLSALGGBJSGFSDKJFKDSFKFJDF'
        let lText = 'sdfggsdgsdgdsgsdgdsgsdfgsdfsfdsf'
        let schar = '@#$%^&&%$%^'
        let number = Math.floor(Math.random() * 100)
        let utext1 = Array.from({ length: 3 }, () =>
            uText.charAt(Math.floor(Math.random() * uText.length))
        ).join('')
        let ltext1 = Array.from({ length: 5 }, () =>
            lText.charAt(Math.floor(Math.random() * lText.length))
        ).join('')
        let schar1 = Array.from({ length: 2 }, () =>
            schar.charAt(Math.floor(Math.random() * schar.length))
        ).join('')

        let password = utext1 + ltext1 + schar1 + number.toString()
        return password
    }


}
