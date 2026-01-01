import {test as base, Page} from '@playwright/test'
import Login from '../OrangeHRM_POM_pages/Login'
import baseClass from '../OrangeHRM_Utils/OrangeHRMBase'
import PIMModule from '../OrangeHRM_POM_pages/PIMModule'



type pageFixtures={
    loginObject:Login,
    pimModuleObject:PIMModule
}
export let test = base.extend<pageFixtures>({

    loginObject:async({}, use)=>{

        let login = new Login()
        await use(login)
    },
    pimModuleObject:async({}, use)=>{

        let pimModule = new PIMModule()
        await use(pimModule)
    }

})