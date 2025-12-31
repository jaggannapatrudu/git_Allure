import {test} from '../OrangeHRM_Fixtures/fixtures'


test('OrangeHRM Add Employee', async ({loginObject, pimModuleObject})=>
{
    await loginObject.OrangeHRMLogin()
    let employeeData = await pimModuleObject.addEmployee()
    await loginObject.OrangeHRMLogoff()
})
