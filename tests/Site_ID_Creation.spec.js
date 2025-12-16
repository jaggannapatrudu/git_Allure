import{test} from '@playwright/test'
import {Pegaportal} from './POM_PAGES/PEGA_PORTAL'
import {LmpsPortal} from './POM_PAGES/LMPS_PORTAL'
import * as LMPSDATA from './TestData/testdata.json'
let globalID  , mslEmailAddress, rrEmailAddress, siteID, webcontext, newpage

     

     test('Site ID creation in Pega portal nihanya jagan jagan', async ({page, context},testInfo)=>
          {
              
               const pegaPortal = new Pegaportal(page)
               await pegaPortal.Pega_login()
               const data = await pegaPortal.SITE_ID_CREATION_upload_File(context,testInfo) 
               globalID = data[0]
               rrEmailAddress = data[1]
               mslEmailAddress = data[2]
     })
/*
     test('Add RR training date in LMPS portal', async ({browser},testInfo)=>
          {
                const context = await browser.newContext()
               const page = await context.newPage()
              const lmpsportal = new LmpsPortal(page)
               webcontext = await lmpsportal.lmpslogin(testInfo, context, browser)
               siteID = await lmpsportal.LMPS_ASSIGN_RR_TRAININGDATE(globalID, testInfo)
               newpage = await webcontext.newPage()
               
     })
     test('Pre Training checklist through process documents', async ({},testInfo)=>
          {
              const lmpsportal = new LmpsPortal(newpage)
               await lmpsportal.LMPS_PRE_TRAINING_PROCESS_DOCUMENTS(globalID, testInfo)
     })

     
     test('Post Training checklist through process documents', async ({},testInfo)=>
          {
              const lmpsportal = new LmpsPortal(newpage)
               await lmpsportal.LMPS_POST_TRAINING_PROCESS_DOCUMENTS(globalID, testInfo)
     })
     test('RR Acknowledgement through process documents', async ({},testInfo)=>
          {
              const lmpsportal = new LmpsPortal(newpage)
               await lmpsportal.LMPS_RR_ACKNOWLEDGEMENT_PROCESS_DOCUMENTS(globalID, testInfo)
     })
     test('Qualification checklist submission', async ({},testInfo)=>
          {
              const lmpsportal = new LmpsPortal(newpage)
               await lmpsportal.QUALIFICATION_CHECKLIST(siteID, testInfo, globalID)
               await lmpsportal.LMPS_LOGOFF()
     })*/

     
     