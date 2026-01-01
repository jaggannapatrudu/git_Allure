import {test} from '../OrangeHRM_Fixtures/fixtures'
import {Page} from '@playwright/test'
import baseClass  from '../OrangeHRM_Utils/OrangeHRMBase'
let page:Page;
test.beforeAll(async()=>{
    let baseObj = new baseClass()
page = await baseObj.storageState()

})

test('OrangeHRM Add Employee', async ({loginObject, pimModuleObject})=>
{
    
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})

test('OrangeHRM Add Employee1', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee12', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee123', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee1234', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee12345', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee123456', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee1234567', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee12345678', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


test('OrangeHRM Add Employee123456789', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})

test('OrangeHRM Add Employee1234567890', async ({loginObject, pimModuleObject})=>
{
     await loginObject.urlLaunch(page)
    await loginObject.OrangeHRMLogin(page)
    await pimModuleObject.addEmployee(page)
    //await loginObject.OrangeHRMLogoff(page)
})


