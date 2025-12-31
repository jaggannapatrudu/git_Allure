import{FullResult, FullConfig, Suite, Reporter, TestCase, TestResult, TestStep} from '@playwright/test/reporter'

export default class CustomizedReporter implements Reporter
{
    onEnd(result:FullResult)
    {
            console.log('on End Method')
    }
    onBegin(config: FullConfig, suite: Suite)
    {
        console.log('On Begin method')
    }
    onStepBegin(test: TestCase, result: TestResult, step: TestStep)
    {
        console.log('On Step Begin method')
    }
    onStepEnd(test: TestCase, result: TestResult, step: TestStep)
    {
        console.log('On Step End method')
    }
    onTestBegin(test: TestCase, result: TestResult)
    {
        console.log('On Test Begin method')
    }
    onTestEnd(test: TestCase, result: TestResult)
    {
        console.log('On Test End method')
    }
}