import {  test,testInfo,expect} from "@playwright/test"
import * as PegaData from '../TestData/testdata.json'
import { execPath } from "process"
export class Pegaportal 

{
    
    constructor(page)
    {
        
        this.page=page
        this.username = '#txtUserID'
        this.password = '#txtPassword'
        this.submit = '#sub'
          this.launchportal = 'Launch portal'
          this.intractionPortal = 'Interaction Portal'
          this.framelocator = "[name='PegaGadget0Ifr']"
          this.createSite = 'Create Site (Admin Only)'
          this.framelocator1 = "[name='PegaGadget1Ifr']"
          this.txtAutoPopulate = 'Auto Populate Fields'
          this.btnProductCanel = '.token-cancel.token-cancel-img'
          this.txtSiteGlobalID = "[name='$PSiteEntry$pGLOBAL_ID']"
          this.txtRREmailID = "[name='$PSiteEntry$pEMAIL_ADDRESS']"
          this.txtMslEmailID = "[name='$PpyDisplayHarness$pUserProfiles$l1$pEmail']"
          this.btnCreateSite = 'Create Site'
          this.btnCreateSiteSubmit = '#ModalButtonSubmit'
          this.imgProfile = 'Profile'
          this.lnkSinout = '//*[@id="RULE_KEY"]/div/div/div/div/div/div[2]/div/div[2]/span/i/img'
          this.generateCSV = "text='Generate CSV'"
          this.uploadfilebtn = "//span[@class='menu-item-title'][normalize-space()='File Upload']"
          this.deleteAllFile = "//div[3]/div[2]/div[1]/div[1]/span[1]/button[1]"
          this.uploadfile = "//div[3]/div[1]/div[1]/div[1]/span[1]/button[1]"
          this.actorFile = "//input[@id='$PpyAttachmentPage$pFileName']"
          this.rosterFile = "//input[@id='$PpyAttachmentPage$pDescription']"
          this.siteFile = "//input[@id='$PpyAttachmentPage$pFieldName']"
          this.fileSubmit = "//button[@id='ModalButtonSubmit']"
          this.createSitefile = "//div[3]/div[3]/div[1]/div[1]/span[1]/button[1]"
          this.siteCreationsuccMsg = "//div[1]/span[1]/div[1]/div[1]/div[1]"
          this.profile = "//img[@title='Profile']"
          this.logout = "//span[contains(text(),'Log out')]"
          this.pegaprofie = "//div[1]/div[2]/div[1]/button[1]"
          this.pegalogoff = "//body[1]/div[13]/ul[1]/li[8]/a[1]/span[2]"
    }//////////////////////////////

    static async  Takes_Screenshot(descriptinofScreenshot, pagename, testinfo)
    {
        const screenshot = await pagename.screenshot({fullPage:true});
        testinfo.attach(descriptinofScreenshot, { body: screenshot, contentType: 'image/png' });
    }
    static async AttachText(screenshotdescription,requirementCoverage,expectedText,actualText,testinfo)
    {
         await testinfo.attach(`${screenshotdescription}`, {
                        body: `Requirement ${requirementCoverage} covered`+'\n'+`Expected:`+`${expectedText}`
                        +'\n'+'Actual:'+`${actualText}`,
                        contentType: 'text/plain',
                    });
    }
    async  SITE_ID_CREATION_upload_File(context, testinfo)
        {
            let siteData
             
             
               
             if(await this.page.getByTitle(this.launchportal ).isEnabled())
             {
                await expect(this.page.locator("//*[@id='RULE_KEY']/div[2]/span[1]/nobr/span/a")).toBeVisible()
                await this.page.waitForTimeout(2000)
                await Pegaportal.Takes_Screenshot('Pega home page', this.page,testinfo)
                await Pegaportal.AttachText('Pega home page displayed','REQ123','Pega home page displayed','Pega home page displayed',testinfo)
                  await this.page.getByTitle(this.launchportal ).click()
                 

                  await this.page.getByText(this.intractionPortal ).waitFor()
                  await Pegaportal.Takes_Screenshot('Interaction portal link',this.page,testinfo)
                    await Pegaportal.AttachText('Interaction portal link','REQ234','Interaction portal link displayed.','Interaction portal link displayed.',testinfo)
                  await this.page.waitForTimeout(1000)
                  const [newPage1] = await Promise.all([
                        this.page.waitForEvent('popup'),
                        await this.page.getByText(this.intractionPortal ).click({force: true})
                  ])
        
                  const frameLocator = await newPage1.frameLocator(this.framelocator)
                  
                await frameLocator.getByText(this.createSite).waitFor()
                  //await this.page.waitForTimeout(3000)
                  await Pegaportal.Takes_Screenshot('Create Site button',newPage1,testinfo);
                  
                    await Pegaportal.AttachText('Create Site button','REQ565','Create Site button. displayed','Create Site button. displayed',testinfo)
                  await frameLocator.getByText(this.createSite).click()
                   const frameLocator1 = await newPage1.frameLocator(this.framelocator1)
                  await frameLocator1.getByText(this.txtAutoPopulate).click()
                  await newPage1.waitForTimeout(1000)
                   await Pegaportal.Takes_Screenshot('Site details populated',newPage1, testinfo);
                   
                   //await newPage1.screenshot({path:'tests/screenshots/'+Date.now()+'.png'})
                  const prodName = await frameLocator1.locator(this.btnProductCanel)
                  await newPage1.waitForTimeout(1000) 
                  const siteglobalID      = await frameLocator1.locator(this.txtSiteGlobalID).inputValue();
                  const emailAddres   = await frameLocator1.locator(this.txtRREmailID).inputValue();
                  const mslAdddress    = await frameLocator1.locator( this.txtMslEmailID ).inputValue();
                 // const values = siteglobalID+","+emailAddres+","+mslAdddress
                    await Pegaportal.AttachText('Site details populated','REQ565','Global ID generated: '+siteglobalID,'Global ID generated: '+siteglobalID,testinfo)
                   siteData = [siteglobalID, emailAddres, mslAdddress]
                    //await newPage1.waitForTimeout(60000) 
                   //await newPage1.screenshot({path:'tests/screenshots/'+Date.now()+'.png'})
                 const downloads = []; 
                    newPage1.on('download', (download) => {
                        downloads.push(download);
                    });

                     await frameLocator1.locator(this.generateCSV).click()
                    await newPage1.waitForTimeout(2000);
                    
                                            // Process each downloaded file
                    for (const download of downloads) {
                        const suggestedFilename = download.suggestedFilename();
                        const savePath = "tests/Uploadfiles/"+suggestedFilename // Define your save path
                        await download.saveAs(savePath);
                        
                    }
                    const allPages = context.pages()
                    const pageCount = allPages.length;
                    for(let i=2;i<pageCount;i++)
                    {
                        await allPages[i].close()
                    }
                    await frameLocator.locator(this.uploadfilebtn).highlight()
                    // await newPage1.waitForTimeout(2000)
                    await frameLocator.locator(this.uploadfilebtn).click()
                    await frameLocator1.locator(this.deleteAllFile).click()
                    await frameLocator1.locator(this.uploadfile).click()
                    await newPage1.waitForTimeout(1000)
                    await frameLocator1.locator(this.actorFile).setInputFiles('tests/Uploadfiles/ACTOR_MASTER_DATA_REMS.csv')
                    await newPage1.waitForTimeout(1000)
                     await frameLocator1.locator(this.rosterFile).setInputFiles('tests/Uploadfiles/REMS_Roster.csv')
                     await newPage1.waitForTimeout(1000)
                      await frameLocator1.locator(this.siteFile).setInputFiles('tests/Uploadfiles/SITE_MASTER_REMS.csv')
                      await newPage1.waitForTimeout(1000)
                      
                      await frameLocator1.locator(this.fileSubmit).waitFor()
                      await frameLocator1.locator(this.fileSubmit).click()
                      await newPage1.waitForTimeout(2000)
                      await frameLocator1.locator(this.createSitefile).waitFor()
                      await frameLocator1.locator(this.createSitefile).click()
                      await expect.soft(frameLocator1.locator(this.siteCreationsuccMsg)).toHaveText('Site Creation Process Completed')
                     await Pegaportal.Takes_Screenshot('site created successfully',newPage1,testinfo);
                    await testinfo.attach('site created successfully', {
                        body: 'Requirement REQ123 covered'+'\n'+'Expected:'+'Site Creation Process Completed'
                        +'\n'+'Actual:'+'Site Creation Process Completed',
                        contentType: 'text/plain',
                    });
                    //await Pegaportal.AttachText('site created successfully','REQ684','site created successfully','site created successfully',testinfo)
                      await frameLocator1.locator(this.deleteAllFile).click()
                    await newPage1.waitForTimeout(1000)
                    await newPage1.locator(this.profile).click()
                    newPage1.on('dialog',async(alert)=> {
                        alert.accept()
                    })
                   
                    await newPage1.locator(this.logout).click()
                    await this.page.locator(this.pegaprofie).click()
                    await this.page.locator(this.pegalogoff).click()
                    await this.page.waitForTimeout(1000)
             }
            
            await this.page.close()
             
        return siteData
        }
    async Pega_login()
    {
            await this.page.goto(PegaData.url)
            await this.page.locator(this.username).fill(PegaData.pegausername)
            await this.page.locator(this.password).fill(PegaData.pegapassword)
            await this.page.locator(this.submit).click()

    }
    async  SITE_ID_CREATION()
        {
            let siteData
                         
               
             if(await this.page.getByTitle(this.launchportal ).isEnabled())
             {
                 await this.page.screenshot({path:'tests/screenshots/'+Date.now()+'.png'})
                  await this.page.getByTitle(this.launchportal ).click()
                  await this.page.getByText(this.intractionPortal ).waitFor()
                  await this.page.waitForTimeout(3000)
                  const [newPage1] = await Promise.all([
                        this.page.waitForEvent('popup'),
                        await this.page.getByText(this.intractionPortal ).click({force: true})
                  ])
        
                  const frameLocator = await newPage1.frameLocator(this.framelocator)
                  await frameLocator.getByText(this.createSite).click()
                   const frameLocator1 = await newPage1.frameLocator(this.framelocator1)
                  await frameLocator1.getByText(this.txtAutoPopulate).click()
                  await newPage1.waitForTimeout(2000)
                   await newPage1.screenshot({path:'tests/screenshots/'+Date.now()+'.png'})
                  const prodName = await frameLocator1.locator(this.btnProductCanel)
        
                  if(PegaData.productName.includes('ABECMA'))               
                  {
                       await prodName.last().click()
                  }
                  else
                  {
                       await prodName.first().click()
                  }
                  await newPage1.waitForTimeout(2000) 
                  const siteglobalID      = await frameLocator1.locator(this.txtSiteGlobalID).inputValue();
                  const emailAddres   = await frameLocator1.locator(this.txtRREmailID).inputValue();
                  const mslAdddress    = await frameLocator1.locator( this.txtMslEmailID ).inputValue();
                 // const values = siteglobalID+","+emailAddres+","+mslAdddress
                   PegaData.globalID =  siteglobalID
                    PegaData.rrEmailAddress =  emailAddres
                   PegaData.mslAddress =  mslAdddress
                   siteData = [siteglobalID, emailAddres, mslAdddress]
                    
                  await frameLocator1.getByText(this.btnCreateSite).click()
                  await expect(frameLocator1.locator(this.btnCreateSiteSubmit)).toBeVisible()
                  
                   await newPage1.screenshot({path:'tests/screenshots/'+Date.now()+'.png'})
                  
                       await frameLocator1.locator(this.btnCreateSiteSubmit).click()
                   await newPage1.waitForTimeout(2000) 
                  await newPage1.getByAltText(this.imgProfile).click()
                  newPage1.on('dialog', async (alert)=>
                  {
                            await alert.accept()
                  }
                  )
                  await newPage1.locator(this.lnkSinout).click();
                  await newPage1.waitForTimeout(2000) 
                   await newPage1.close()
                 
             }
            
            await this.page.close()
             
        return siteData
        }

}
