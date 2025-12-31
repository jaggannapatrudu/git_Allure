import type {
  Reporter,
  TestCase,
  TestResult,
  FullResult
} from '@playwright/test/reporter';

import * as fs from 'fs';
import * as path from 'path';

interface TestData {
  title: string;
  status: string;
  duration: number;
  error?: string;
  screenshots: string[];
}

class CustomHtmlReporter implements Reporter {
  private results: TestData[] = [];
  private outputDir: string;

  constructor(options: { outputDir?: string } = {}) {
    this.outputDir = options.outputDir || 'test-results';
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const screenshots = result.attachments
      .filter(a => a.name === 'screenshot')
      .map(a => a.path!)
      .filter(Boolean);

    this.results.push({
      title: test.title,
      status: result.status.toUpperCase(),
      duration: result.duration,
      error: result.error?.message,
      screenshots
    });
  }

  onEnd(result: FullResult) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const reportPath = path.join(this.outputDir, 'report.html');
    fs.writeFileSync(reportPath, this.generateHtml());

    console.log(`\n📊 Custom HTML report generated at: ${reportPath}`);
  }

  private generateHtml(): string {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const failed = this.results.filter(r => r.status === 'FAILED').length;

    return `
<!DOCTYPE html>
<html>
<head>
<title>Playwright Automation Report</title>
<style>
body { font-family: Arial; background:#f4f6f9; padding:20px; }
h1 { color:#333; }
.summary { display:flex; gap:20px; margin-bottom:20px; }
.card { background:white; padding:15px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,.1); }
.passed { color:green; }
.failed { color:red; }
.test { background:white; padding:15px; margin-bottom:15px; border-radius:8px; }
img { max-width:300px; border:1px solid #ddd; margin-top:5px; }
</style>
</head>

<body>
<h1>🚀 Playwright Execution Report</h1>

<div class="summary">
  <div class="card">Total: ${total}</div>
  <div class="card passed">Passed: ${passed}</div>
  <div class="card failed">Failed: ${failed}</div>
</div>

${this.results.map(r => `
<div class="test">
  <h3>${r.title}</h3>
  <p>Status: <b class="${r.status === 'PASSED' ? 'passed' : 'failed'}">${r.status}</b></p>
  <p>Duration: ${r.duration} ms</p>
  ${r.error ? `<pre>${r.error}</pre>` : ''}
  ${r.screenshots.map(s => `<img src="${s}" />`).join('')}
</div>
`).join('')}

</body>
</html>`;
  }
}

export default CustomHtmlReporter;
