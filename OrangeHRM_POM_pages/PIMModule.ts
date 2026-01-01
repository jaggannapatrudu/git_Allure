import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs'
import path from 'path'
import * as PIMLocators from '../OrangeHRMLocators/OrangeHRMLocatros.json';
import Base from '../OrangeHRM_Utils/OrangeHRMBase'
//let locators = path.join(__dirname, 'orangeHRM_Locators/OrangeHRM_Locators.json')
//let PIMLocators = JSON.parse(fs.readFileSync(locators,'utf-8'))
let addEmployeeLocators = PIMLocators.PimModule.addEmployee
let employlistPersonaldetails = PIMLocators.PimModule.employeeList.personalDetails
export default class PIMModule extends Base {

    async addEmployee(page:Page) {
        let empId = this.randomNumberGeneration().toString()
        let username = this.randomTextGeneration(10)
        let password = this.passwordGenerator()
        let fName = this.randomTextGeneration(5)
        let mName = this.randomTextGeneration(1)
        let lName = this.randomTextGeneration(5)

        await page.getByText(PIMLocators.PimModule.PIMModule).click();
        await page.getByText(PIMLocators.PimModule.AddEmployee).click();
        await page.getByPlaceholder(addEmployeeLocators.empFirstName).fill(fName);
        await page.getByPlaceholder(addEmployeeLocators.empMiddleName).fill(mName);
        await page.getByPlaceholder(addEmployeeLocators.empLastName).fill(lName);

        await page.locator(addEmployeeLocators.EmpID).fill(empId);
        page.on('filechooser', filecho => {
            filecho.setFiles('./FileUpload/photo.png');
        });
        await page.locator(addEmployeeLocators.empPhoto).click();
        await page.locator(addEmployeeLocators.createLoginDetails).click();

        await page.locator(addEmployeeLocators.username).fill(username);
        await page.locator(addEmployeeLocators.password).first().fill(password);
        await page.locator(addEmployeeLocators.confirmPassword).last().fill(password);

        await page.getByText(addEmployeeLocators.saveBtn).click();
        await expect(page.getByText(employlistPersonaldetails.personaDetailsHeader).last()).toBeVisible({ timeout: 10000 })

        return [empId, username, password, fName, mName, lName]
    }


}