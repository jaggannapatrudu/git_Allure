import { expect , browser} from '@playwright/test'
import * as LMPSDATA from '../TestData/testdata.json'
export class LmpsPortal 
{
     
    constructor(page)
    {
     
          this.page = page
        this.txtusername = '#txtUserID'
        this.txtpassword = '#txtPassword'
        this.logbtnsubmit = '#sub'
        this.frameLocator = "[name='PegaGadget0Ifr']"
        this.eleWelcometxt = '//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]'
        this.eleLmpstxt = '//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]'
        this.btnNew = 'New'
        this.lnkMenu = '.menu-item-title'
        this.frameLocator1 = '[name="PegaGadget1Ifr"]'
        this.txtGlobalID = "[name*='SearchStringMemberID']"
        this.prductSelection = "//select[contains(@name,'ProductName')]"
        this.btnSearch = 'Search'
        this.tableRows = "//*[@id='bodyTbl_right']/tbody/tr"
        this.tableColumn = "//*[@id='bodyTbl_right']/tbody/tr/th"
        this.btnSubmit = 'Complete this assignment'
        this.btnAddTask = 'Add Task'
        this.btnAddRRTraining = '//span[2]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/a[1]'
        this.btnAddTasks = 'Add tasks'
        this.dateDaySele = "Day"
        this.dateMonSele = "Month"
        this.dateYearSele ="Year"
        this.preferredLang = "(//input[@name='$PpyWorkPage$pUserProfile$pLanguage'])[1]"
        this.dateAttDay = "[id='$PpyWorkthis.page$pEducationModelAttestationDateDySel']"
        this.dateAttMonth = "[id='$PpyWorkthis.page$pEducationModelAttestationDateMoSel']"
        this.dateAttYear = "[id='$PpyWorkthis.page$pEducationModelAttestationDateYrSel']"
          this.myWorkbasket = "//h3[normalize-space()='My Workbaskets']"

    }


 async lmpslogin(testinfo, context, browser)
    {
               ///
              
               await this.page.goto(LMPSDATA.url)
               await this.page.locator(this.txtusername).fill(LMPSDATA.lmpsUserName)
               await this.page.locator(this.txtpassword).fill(LMPSDATA.lmpsPassword)
               await this.page.locator(this.logbtnsubmit).click()

             const frame = await this.page.frameLocator(this.frameLocator)
             await this.page.locator("(//a[@id='TABANCHOR'])[1]").waitFor()
               await frame.locator(this.myWorkbasket).waitFor()
            await LmpsPortal.Takes_Screenshot('LMPS home page displayed',this.page,testinfo)
            
             await context.storageState({path:'state.json'})
              const webcontext = await browser.newContext({storageState: 'state.json'})
          
          return webcontext
    }
//////////////////////
async LMPS_LOGOFF()
{
     await this.page.getByTitle('Profile').click()
     await expect(this.page.getByText('Log out')).toBeVisible()
     this.page.on('dialog', async(alert)=>{
          alert.accept()
     })
     await this.page.getByText('Log out').click()
     await this.page.waitForTimeout(2000)
}
static async  Takes_Screenshot(descriptinofScreenshot, pagename, testinfo)
    {
        const screenshot = await pagename.screenshot({fullPage:true});
        testinfo.attach(descriptinofScreenshot, { body: screenshot, contentType: 'image/png' });
    }

///////////////////////////
async LMPS_ASSIGN_RR_TRAININGDATE(globalID, testinfo)
{
     let siteID
     await this.page.locator("(//a[@id='TABANCHOR'])[1]").click()
          const locatre = this.page.locator(".menuBarSub ul li")
          await locatre.last().locator("a").click()
     await this.page.waitForLoadState()
     if(await this.page.getByTitle(this.btnNew).isVisible())
          {
          await this.page.getByTitle(this.btnNew).click();
          await this.page.click(this.lnkMenu);
          const frameLocator1 = await this.page.frameLocator(this.frameLocator1);
          
          if(await frameLocator1.locator(this.txtGlobalID).isEnabled())
          {
                    await frameLocator1.locator(this.txtGlobalID).fill(globalID)
                    await frameLocator1.locator(this.prductSelection).selectOption(LMPSDATA.productName)
                    await frameLocator1.getByTitle(this.btnSearch).click();
          }
         await expect(frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr[2]/td[1]")).toBeVisible()
          
          const rowlocator = await frameLocator1.locator(this.tableRows)
          const rowCount = await rowlocator.count()
          const colLocator = await frameLocator1.locator(this.tableColumn)
          const colCount=await colLocator.count()
         await LmpsPortal.Takes_Screenshot('Site details displayed',this.page,testinfo)
          const loc = await frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr")
          let flag = false
          for(let i=0;i<await loc.count();i++)
          {
               const columns = loc.locator('td')
               for(let j=0;j<await columns.count();j++)
               {
                    const prod = await columns.nth(j).textContent()
                    if(prod===LMPSDATA.productName)
                    {
                         await columns.nth(j).click()
                         siteID =  await columns.nth(0).textContent()
                         flag = true
                    }
                    if(flag===true)
                    {
                         break
                    }
               }
          }
          // /.locator({hasText:LMPSDATA.productName}).click()
               
               if(await frameLocator1.getByTitle(this.btnSubmit).isVisible())
               {
                    await frameLocator1.getByTitle(this.btnSubmit).click()
               }
               //await expect(frameLocator1.getByTitle(this.btnAddTask)).tobe
               await frameLocator1.locator('//div/div/span/div/div/div/div/div/div[4]/div[1]/h3').waitFor()
               if(await frameLocator1.getByTitle(this.btnAddTask))
               {
                    
                    await frameLocator1.getByTitle(this.btnAddTask).click()
                    await frameLocator1.locator(this.btnAddRRTraining).click();
                     await LmpsPortal.Takes_Screenshot('Add RR Training Date selected',this.page,testinfo)
                    await frameLocator1.getByTitle(this.btnAddTasks).click();
                    await this.page.waitForLoadState()
                    const dateobj = new Date();
                    const dateval = dateobj.getDate().toString()
                    const monthval = dateobj.getMonth()
                    const yearval = dateobj.getFullYear().toString()
                    await frameLocator1.getByTitle(this.dateDaySele).selectOption(dateval)
                    await frameLocator1.getByTitle(this.dateMonSele).selectOption({index:monthval+1})
                    await frameLocator1.getByTitle(this.dateYearSele).selectOption(yearval)
                    
                    //if(await frameLocator1.getByText(this.preferredLang).isVisible())
                    //{
                         //await frameLocator1.locator(this.preferredLang).check()
                    //}
                    await frameLocator1.locator("[name='$PpyWorkPage$ppySelected'][type='checkbox']").check()
                     await LmpsPortal.Takes_Screenshot('Training Date details entered',this.page,testinfo)
                    await frameLocator1.getByTitle('Complete this assignment').click()
                    await expect(frameLocator1.getByTitle("Confirm")).toBeVisible()
                    await this.page.waitForTimeout(2000)
                    await LmpsPortal.Takes_Screenshot('Training Date success window displayed',this.page,testinfo)
                    await frameLocator1.getByTitle("Confirm").click()
                    //Warp up
                    await expect(frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton")).toBeVisible()
                    await frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton").click()
                    await expect(frameLocator1.locator(".pzbtn-mid")).toBeVisible()
                         await frameLocator1.locator(".pzbtn-mid").click()
                         await this.page.waitForTimeout(2000)

          }

          }
          else{
               console.log('no link')
          }
         await this.page.close()
         
         return siteID
          
}


async LMPS_PRE_TRAINING_PROCESS_DOCUMENTS(globalID, testinfo)
{
     //await this.page.waitForTimeout(1000)
     await this.page.goto(LMPSDATA.url)
     
     await this.page.waitForLoadState()
     if(await this.page.getByTitle(this.btnNew).isVisible())
          {
          await this.page.getByTitle(this.btnNew).click();
          await this.page.click(this.lnkMenu);
          const frameLocator1 = await this.page.frameLocator(this.frameLocator1);
          
          if(await frameLocator1.locator(this.txtGlobalID).isEnabled())
          {
                    await frameLocator1.locator(this.txtGlobalID).fill(globalID)
                    await frameLocator1.locator(this.prductSelection).selectOption(LMPSDATA.productName)
                    await frameLocator1.getByTitle(this.btnSearch).click();
          }
         await expect(frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr[2]/td[1]")).toBeVisible()
          
          const rowlocator = await frameLocator1.locator(this.tableRows)
          const rowCount = await rowlocator.count()
          const colLocator = await frameLocator1.locator(this.tableColumn)
          const colCount=await colLocator.count()
         await LmpsPortal.Takes_Screenshot('Site details displayed',this.page,testinfo)
          const loc = await frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr")
          let flag = false
          for(let i=0;i<await loc.count();i++)
          {
               const columns = loc.locator('td')
               for(let j=0;j<await columns.count();j++)
               {
                    const prod = await columns.nth(j).textContent()
                    if(prod===LMPSDATA.productName)
                    {
                         await columns.nth(j).click()
                         flag = true
                    }
                    
               }
               if(flag===true)
                    {
                         break
                    }
          }
               
               if(await frameLocator1.getByTitle(this.btnSubmit).isVisible())
               {
                    await frameLocator1.getByTitle(this.btnSubmit).click()
               }
               await frameLocator1.locator('//div/div/span/div/div/div/div/div/div[4]/div[1]/h3').waitFor()
                await LmpsPortal.Takes_Screenshot(`${LMPSDATA.productName} Site details displayed`,this.page,testinfo)
               if(await frameLocator1.getByTitle(this.btnAddTask))
               {
                    await frameLocator1.getByTitle(this.btnAddTask).click()
               }
                  //////////
                  
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").waitFor()
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").click()
                    await frameLocator1.getByTitle('Add tasks').click();
                    await frameLocator1.locator("[title='Pre-Training Checklist']").waitFor()
                    await frameLocator1.locator("[title='Pre-Training Checklist']").click()
                    await this.page.waitForTimeout(1000)
                    await LmpsPortal.Takes_Screenshot('Pre-Training Checklist selected', this.page, testinfo)
                    while(await frameLocator1.locator("[title='Pre-Training Checklist']").isVisible())
                    {
                         await frameLocator1.getByTitle('Complete this assignment').click()
                         await this.page.waitForTimeout(3000)
                    }
                    if(await frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]").isVisible())
                    {
                         await expect(frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]")).toContainText(`Scheduled ${LMPSDATA.productName} RMinP Live Training Date`)
                         await LmpsPortal.Takes_Screenshot('Pre Training page displayed',this.page,testinfo)
                         await LmpsPortal.Takes_Screenshot('RR information displayed',this.page,testinfo)
                         await frameLocator1.locator("(//span[@name='calendarIcon'])[2]").click()
                         await frameLocator1.locator("#todayLink").click()
                         await frameLocator1.locator("//div[2]/div/div/div/div[1]/div/span/div/div[5]/div[3]/div/button").click()
                         
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").waitFor()
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").setInputFiles('tests/Uploadfiles/Test.pdf')
                         
                         await frameLocator1.locator("#ModalButtonSubmit").click()
                         
                         await expect(frameLocator1.locator(".oflowDivM span a")).toBeVisible()
                         //await this.page.waitForTimeout(3000)
                         
                         
                         //await LmpsPortal.Takes_Screenshot('File uploaded',this.page,testinfo)
                         //await page.waitForTimeout(3000)
                         await frameLocator1.locator("[NAME='pyCaseActionAreaButtons_pyWorkPage_13']").click()
                         const successmessag = frameLocator1.locator("(//*[@id='RULE_KEY']/div[1]/div/div/div[5])[1]")
                         await expect(successmessag).toContainText('has been created successfully')
                         await expect( frameLocator1.getByTitle("Confirm")).toBeVisible()
                          await this.page.waitForTimeout(1000)
                         await LmpsPortal.Takes_Screenshot('Pre-training completed successfully',this.page,testinfo)
                         await frameLocator1.getByTitle("Confirm").click()
                         //wrap up
                         await expect(frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton")).toBeVisible()
                         await frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton").click()
                         await expect(frameLocator1.locator(".pzbtn-mid")).toBeVisible()
                         await frameLocator1.locator(".pzbtn-mid").click()
                         await this.page.waitForTimeout(2000)
                    }
                    else
                    {
                         await expect.soft(frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]")).toContainText('Scheduled ABECMA RMinP Live Training Date')
                    }
               }
          else{
               console.log('no link')
          }
        // await this.page.close()
         
}


async LMPS_POST_TRAINING_PROCESS_DOCUMENTS(globalID, testinfo)
{
     await this.page.goto(LMPSDATA.url)
     await this.page.waitForLoadState()
     if(await this.page.getByTitle(this.btnNew).isVisible())
          {
          await this.page.getByTitle(this.btnNew).click();
          await this.page.click(this.lnkMenu);
          const frameLocator1 = await this.page.frameLocator(this.frameLocator1);
          
          if(await frameLocator1.locator(this.txtGlobalID).isEnabled())
          {
                    await frameLocator1.locator(this.txtGlobalID).fill(globalID)
                    await frameLocator1.getByTitle(this.btnSearch).click();
          }
         await expect(frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr[2]/td[1]")).toBeVisible()
          
          const rowlocator = await frameLocator1.locator(this.tableRows)
          const rowCount = await rowlocator.count()
          const colLocator = await frameLocator1.locator(this.tableColumn)
          const colCount=await colLocator.count()
         await LmpsPortal.Takes_Screenshot('Site details displayed',this.page,testinfo)
          const loc = await frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr")
          let flag = false
          for(let i=0;i<await loc.count();i++)
          {
               const columns = loc.locator('td')
               for(let j=0;j<await columns.count();j++)
               {
                    const prod = await columns.nth(j).textContent()
                    if(prod===LMPSDATA.productName)
                    {
                         await columns.nth(j).click()
                         flag = true
                    }
                    
               }
               if(flag===true)
                    {
                         break
                    }
          }
               
               if(await frameLocator1.getByTitle(this.btnSubmit).isVisible())
               {
                    await frameLocator1.getByTitle(this.btnSubmit).click()
               }
               await this.page.waitForTimeout(3000)
                await LmpsPortal.Takes_Screenshot(`${LMPSDATA.productName} Site details displayed`,this.page,testinfo)
               if(await frameLocator1.getByTitle(this.btnAddTask))
               {
                    await frameLocator1.getByTitle(this.btnAddTask).click()
               }
                  //////////
                  
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").waitFor()
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").click()
                    //await page.waitForTimeout(3000)
                    await frameLocator1.getByTitle('Add tasks').click();
                    //await page.waitForTimeout(3000)
                    await frameLocator1.locator("[title='Post-Training Checklist']").waitFor()
                    await frameLocator1.locator("[title='Post-Training Checklist']").click()
                    
                    await LmpsPortal.Takes_Screenshot('Post-Training Checklist selected', this.page, testinfo)
                    await frameLocator1.getByTitle('Complete this assignment').click()

                    if(await frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]").isVisible())
                    {
                         await expect(frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]")).toContainText(`${LMPSDATA.productName} RMinP Live Training Program Scheduled Date`)
                         await LmpsPortal.Takes_Screenshot('Post Training page displayed',this.page,testinfo)
                         
                         await frameLocator1.locator("(//span[@name='calendarIcon'])[1]").click()
                         await frameLocator1.locator("#todayLink").click()
                         await frameLocator1.locator("(//span[@name='calendarIcon'])[2]").click()
                         await frameLocator1.locator("#todayLink").click()
                         await frameLocator1.locator("//label[text()='Live Webcast']").first().click()
                         await frameLocator1.locator("//label[text()='Live Webcast']").last().click()
                         await this.page.waitForTimeout(2000)
                         await frameLocator1.locator('//div[1]/div/span/div/div[2]/div/div/div[1]').scrollIntoViewIfNeeded()
                         await this.page.waitForTimeout(1000)
                         await LmpsPortal.Takes_Screenshot('RMinP Live Training Completion Dates selected',this.page,testinfo)
                         await frameLocator1.locator("//input[@type='checkbox']").last().click()

                        //await LmpsPortal.Takes_Screenshot('RR information displayed',this.page,testinfo)
                         await frameLocator1.locator("(//span[@name='calendarIcon'])[3]").click()
                         await frameLocator1.locator("#todayLink").click()
                         await this.page.waitForTimeout(3000)
                         await frameLocator1.locator("//div/div[4]/div[3]/div/button").click()
                         
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").waitFor()
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").setInputFiles('tests/Uploadfiles/Test.pdf')
                         
                         await frameLocator1.locator("#ModalButtonSubmit").click()
                         
                         await expect(frameLocator1.locator(".oflowDivM span a")).toBeVisible()
                         await this.page.waitForTimeout(5000)
                         
                         
                        // await LmpsPortal.Takes_Screenshot('File uploaded',this.page,testinfo)
                         //await page.waitForTimeout(3000)
                         await frameLocator1.locator("[NAME='pyCaseActionAreaButtons_pyWorkPage_13']").click()
                         const successmessag = frameLocator1.locator("(//*[@id='RULE_KEY']/div[1]/div/div/div[5])[1]")
                         await expect(successmessag).toContainText('has been created successfully')
                         await expect( frameLocator1.getByTitle("Confirm")).toBeVisible()
                          await this.page.waitForTimeout(2000)
                         await LmpsPortal.Takes_Screenshot('Post-training completed successfully',this.page,testinfo)
                         await frameLocator1.getByTitle("Confirm").click()
                         //wrap up
                         await expect(frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton")).toBeVisible()
                         await frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton").click()
                         await expect(frameLocator1.locator(".pzbtn-mid")).toBeVisible()
                         await frameLocator1.locator(".pzbtn-mid").click()
                         await this.page.waitForTimeout(2000)
                    }
                    else
                    {
                         await expect.soft(frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]")).toContainText('Scheduled ABECMA RMinP Live Training Date')
                    }
               }
          else{
               console.log('no link')
          }
         
          
}


async LMPS_RR_ACKNOWLEDGEMENT_PROCESS_DOCUMENTS(globalID, testinfo)
{
     await this.page.goto(LMPSDATA.url)
     await this.page.waitForLoadState()
     if(await this.page.getByTitle(this.btnNew).isVisible())
          {
          await this.page.getByTitle(this.btnNew).click();
          await this.page.click(this.lnkMenu);
          const frameLocator1 = await this.page.frameLocator(this.frameLocator1);
          
          if(await frameLocator1.locator(this.txtGlobalID).isEnabled())
          {
                    await frameLocator1.locator(this.txtGlobalID).fill(globalID)
                    await frameLocator1.getByTitle(this.btnSearch).click();
          }
         await expect(frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr[2]/td[1]")).toBeVisible()
          
          const rowlocator = await frameLocator1.locator(this.tableRows)
          const rowCount = await rowlocator.count()
          const colLocator = await frameLocator1.locator(this.tableColumn)
          const colCount=await colLocator.count()
         await LmpsPortal.Takes_Screenshot('Site details displayed',this.page,testinfo)
          const loc = await frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr")
          let flag = false
          for(let i=0;i<await loc.count();i++)
          {
               const columns = loc.locator('td')
               for(let j=0;j<await columns.count();j++)
               {
                    const prod = await columns.nth(j).textContent()
                    if(prod===LMPSDATA.productName)
                    {
                         await columns.nth(j).click()
                         flag = true
                    }
                    
               }
               if(flag===true)
                    {
                         break
                    }
          }
               
               if(await frameLocator1.getByTitle(this.btnSubmit).isVisible())
               {
                    await frameLocator1.getByTitle(this.btnSubmit).click()
               }
               await this.page.waitForTimeout(3000)
                await LmpsPortal.Takes_Screenshot(`${LMPSDATA.productName} Site details displayed`,this.page,testinfo)
               if(await frameLocator1.getByTitle(this.btnAddTask))
               {
                    await frameLocator1.getByTitle(this.btnAddTask).click()
               }
                  //////////
                  
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").waitFor()
                    await frameLocator1.locator("//div/div/div[1]/div[4]/div/div/div[1]/span/a").click()
                    //await page.waitForTimeout(3000)
                    await frameLocator1.getByTitle('Add tasks').click();
                    //await page.waitForTimeout(3000)
                    await frameLocator1.locator("[title='RR Acknowledgement']").waitFor()
                    await frameLocator1.locator("[title='RR Acknowledgement']").click()
                    
                    await LmpsPortal.Takes_Screenshot('RR Acknowledgement Checklist selected', this.page, testinfo)
                    await frameLocator1.getByTitle('Complete this assignment').click()

                    if(await frameLocator1.locator("//div/div/div[2]/div/div/div/div[1]/div/span/div/div[1]/div[1]").isVisible())
                    {
                         await expect(frameLocator1.locator("//div/div/div[2]/div/div/div/div[1]/div/span/div/div[1]/div[1]")).toContainText(`${LMPSDATA.productName}® RMinP Acknowledgement`)
                         await LmpsPortal.Takes_Screenshot('RR Acknowledgement page displayed',this.page,testinfo)
                         
                        //await LmpsPortal.Takes_Screenshot('RR information displayed',this.page,testinfo)
                         await frameLocator1.locator("//span[@name='calendarIcon']").click()
                         await frameLocator1.locator("#todayLink").click()
                         await frameLocator1.locator("//div[1]/div[4]/div[3]/div[1]/button[1]").click()
                         
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").waitFor()
                         await frameLocator1.locator("//*[@id='$PpyAttachmentPage$ppxAttachName']").setInputFiles('tests/Uploadfiles/Test.pdf')
                         
                         await frameLocator1.locator("#ModalButtonSubmit").click()
                         
                         await expect(frameLocator1.locator(".oflowDivM span a")).toBeVisible()
                         await this.page.waitForTimeout(2000)
                         await frameLocator1.locator("[NAME='pyCaseActionAreaButtons_pyWorkPage_13']").click()
                         const successmessag = frameLocator1.locator("(//*[@id='RULE_KEY']/div[1]/div/div/div[5])[1]")
                         await expect(successmessag).toContainText('has been created successfully')
                         await expect( frameLocator1.getByTitle("Confirm")).toBeVisible()
                          await this.page.waitForTimeout(2000)
                         await LmpsPortal.Takes_Screenshot('RR Acknowledgement completed successfully',this.page,testinfo)
                         await frameLocator1.getByTitle("Confirm").click()
                         //wrap up
                         await expect(frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton")).toBeVisible()
                         await frameLocator1.locator(".Wrap_up_button.pzhc.pzbutton").click()
                         await expect(frameLocator1.locator(".pzbtn-mid")).toBeVisible()
                         await frameLocator1.locator(".pzbtn-mid").click()
                         await this.page.waitForTimeout(2000)
                    }
                    else
                    {
                         await expect.soft(frameLocator1.locator("//div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]")).toContainText('Scheduled ABECMA RMinP Live Training Date')
                    }
               }
          else{
               console.log('no link')
          }
         
          
}


async  QUALIFICATION_CHECKLIST(mslCaseID, testinfo, globalID)
{
     await this.page.goto(LMPSDATA.url)
     const framelmpshome = await this.page.frameLocator('#PegaGadget0Ifr')
     await expect(framelmpshome.locator("//h3[normalize-space()='My Workbaskets']")).toBeVisible()
     if(await framelmpshome.locator("//h3[normalize-space()='My Workbaskets']").isVisible())
     {
          await framelmpshome.locator("//h3[normalize-space()='My Workbaskets']").click()
          await framelmpshome.locator("//div[5]/div[2]/div/div/div/div[1]/div/div/select").selectOption('Qualification Checklist')
          if(await framelmpshome.locator("(//*[@id='pui_filter'])[8]").isEnabled())
          {
                    await framelmpshome.locator("(//*[@id='pui_filter'])[8]").click()
                    await expect(framelmpshome.locator("//div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/input[1]")).toBeVisible()
                    await framelmpshome.locator("//div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/input[1]").fill(mslCaseID)
                    await framelmpshome.locator("//button[normalize-space()='Apply']").click()
                    await this.page.waitForTimeout(2000)
                    await LmpsPortal.Takes_Screenshot('Case ID displayed in Qualification checklist Workbasket',this.page,testinfo)
                    await expect(framelmpshome.locator("(//table[@id='bodyTbl_right'])[2]/tbody/tr[2]/td[1]")).toBeVisible()
                    const cseID = await framelmpshome.locator("(//table[@id='bodyTbl_right'])[2]/tbody/tr[2]/td[2]").textContent()

                    if(mslCaseID.includes(cseID))
                    {
                         await framelmpshome.locator("(//table[@id='bodyTbl_right'])[2]/tbody/tr[2]/td[1]").click()
                    }
                    //await expect(this.page.frameLocator('#PegaGadget1Ifr')).toBeVisible()
                     const framelmpshome1 = await this.page.frameLocator('#PegaGadget1Ifr')
                     await framelmpshome1.locator("//div[6]/div[1]/div[1]/div[1]/input[2]").waitFor()
                    if(await framelmpshome1.locator("//div[6]/div[1]/div[1]/div[1]/input[2]").isEditable())
                    {
                         await framelmpshome1.locator("//div[6]/div[1]/div[1]/div[1]/input[2]").check()
                    }
                    await LmpsPortal.Takes_Screenshot('Qualification checklist page displayed',this.page,testinfo)
                    await framelmpshome1.locator("[name='calendarIcon']").click()
                    await framelmpshome1.locator('.today-link').click()
                    await framelmpshome1.locator("(//label[@class='rb_ rb_standard radioLabel'])[1]").click()
                    await expect(framelmpshome1.getByTitle('Complete this assignment')).toBeVisible()
                    await framelmpshome1.getByTitle('Complete this assignment').click()
                    await expect(framelmpshome1.locator('(//div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2])[1]')).toBeVisible()
                   
                    const qualsucc = await framelmpshome1.locator('//span[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]').textContent()
                    //console.log(qualsucc)
                    if(qualsucc.includes('Qualification checklist has been successfully completed. Site is now RMinP qualified.'))
                    {
                         await LmpsPortal.Takes_Screenshot('Site qualified successfully',this.page,testinfo)
                    }
                     
                    await framelmpshome1.locator("(//button[@class='Strong pzhc pzbutton'])[2]").waitFor()
                    await framelmpshome1.locator("(//button[@class='Strong pzhc pzbutton'])[2]").click()
                    await this.page.waitForTimeout(2000)

          }
     }
     if(await this.page.getByTitle(this.btnNew).isVisible())
          {
          await this.page.getByTitle(this.btnNew).click();
          await this.page.click(this.lnkMenu);
          const frameLocator1 = await this.page.frameLocator(this.frameLocator1);
          
          if(await frameLocator1.locator(this.txtGlobalID).isEnabled())
          {
                    await frameLocator1.locator(this.txtGlobalID).fill(globalID)
                    await frameLocator1.getByTitle(this.btnSearch).click();
          }
         await expect(frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr[2]/td[1]")).toBeVisible()
          
          const rowlocator = await frameLocator1.locator(this.tableRows)
          const rowCount = await rowlocator.count()
          const colLocator = await frameLocator1.locator(this.tableColumn)
          const colCount=await colLocator.count()
         await LmpsPortal.Takes_Screenshot('Site details displayed',this.page,testinfo)
          const loc = await frameLocator1.locator("//*[@id='bodyTbl_right']/tbody/tr")
          let flag = false
          for(let i=0;i<await loc.count();i++)
          {
               const columns = loc.locator('td')
               for(let j=0;j<await columns.count();j++)
               {
                    const prod = await columns.nth(j).textContent()
                    if(prod===LMPSDATA.productName)
                    {
                         await columns.nth(j).click()
                         flag = true
                    }
                    
               }
               if(flag===true)
                    {
                         break
                    }
          }
               
               if(await frameLocator1.getByTitle(this.btnSubmit).isVisible())
               {
                    await frameLocator1.getByTitle(this.btnSubmit).click()
               }
               await this.page.waitForTimeout(3000)
               await expect(frameLocator1.locator('//*[@id="RULE_KEY"]/div/div/div/div[2]/div/div/div/div[4]/div/div/div/div[1]/span/button')).toHaveText('Qualified')
                await LmpsPortal.Takes_Screenshot(`${LMPSDATA.productName} Site Qualified`,this.page,testinfo)

          }
     
}


}
