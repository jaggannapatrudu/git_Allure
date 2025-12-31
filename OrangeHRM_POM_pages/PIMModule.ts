import { Page, Locator, expect } from '@playwright/test';
import * as PIMLocators from '../orangeHRM_Locators/OrangeHRM_Locatros.json';
import Base from '../OrangeHRM_Utils/OrangeHRMBase'
let addEmployeeLocators = PIMLocators.PimModule.addEmployee
let employlistPersonaldetails = PIMLocators.PimModule.employeeList.personalDetails
export default class PIMModule extends Base {

    readonly page: Page
    constructor(page: Page) {
        super()
        this.page = page
    }



    async addEmployee() {
        let empId = this.randomNumberGeneration().toString()
        let username = this.randomTextGeneration(10)
        let password = this.passwordGenerator()
        let fName = this.randomTextGeneration(5)
        let mName = this.randomTextGeneration(1)
        let lName = this.randomTextGeneration(5)

        await this.page.getByText(PIMLocators.PimModule.PIMModule).click();
        await this.page.getByText(PIMLocators.PimModule.AddEmployee).click();
        await this.page.getByPlaceholder(addEmployeeLocators.empFirstName).fill(fName);
        await this.page.getByPlaceholder(addEmployeeLocators.empMiddleName).fill(mName);
        await this.page.getByPlaceholder(addEmployeeLocators.empLastName).fill(lName);

        await this.page.locator(addEmployeeLocators.EmpID).fill(empId);
        this.page.on('filechooser', filecho => {
            filecho.setFiles('./FileUpload/photo.png');
        });
        await this.page.locator(addEmployeeLocators.empPhoto).click();
        await this.page.locator(addEmployeeLocators.createLoginDetails).click();

        await this.page.locator(addEmployeeLocators.username).fill(username);
        await this.page.locator(addEmployeeLocators.password).first().fill(password);
        await this.page.locator(addEmployeeLocators.confirmPassword).last().fill(password);

        await this.page.getByText(addEmployeeLocators.saveBtn).click();
        await expect(this.page.getByText(employlistPersonaldetails.personaDetailsHeader).last()).toBeVisible({ timeout: 10000 })

        return [empId, username, password, fName, mName, lName]
    }


}