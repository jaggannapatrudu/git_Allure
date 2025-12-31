import {test as base} from '@playwright/test'
import Login from '../OrangeHRM_POM_pages/Login'
import PIMModule from '../OrangeHRM_POM_pages/PIMModule'


type pageFixtures={
    loginObject:Login,
    pimModuleObject:PIMModule
}
export let test = base.extend<pageFixtures>({

    loginObject:async({page}, use)=>{

        let login = new Login(page)
        await use(login)
    },
    pimModuleObject:async({page}, use)=>{

        let pimModule = new PIMModule(page)
        await use(pimModule)
    }

})