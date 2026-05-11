// Day 5 - ES6+ Features

// 1. Spread — merge two skill arrays
const automationSkills = ["Playwright", "Cypress", "Selenium"];
const devopsSkills     = ["Docker", "GitHub Actions", "AWS"];
const allSkills = [...automationSkills, ...devopsSkills];

console.log("All skills: ",allSkills);


// 2. Rest — accept unlimited bug titles
function createReport (engineer, ...bugTitles){
    return{
        engineer,
        totalBugs : bugTitles.length,
        bugs : bugTitles,
    };
}
console.log(createReport("Abdullah", "Login crash", "API timeout", "UI glitch"));

// 3. Nullish coalescing
const testRun = { passed: 0, failed: null };
console.log(testRun.passed ?? "No Data");
console.log(testRun.failed ?? "No Data");

// 4. Async/Await — simulate fetching a test report
function fetchReport(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, status: "passed", tests: 42 }), 800);
  });
}

async function loadReport(id) {
  try {
    console.log("Fetching report...");
    const report = await fetchReport(id);
    console.log("Report loaded:", report);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

loadReport("RPT-001");



// The helper — simulates async delay
function testSuite(suiteName, ...testNames) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("done"), 1000);
  });
}

// Main function
async function runTestSuite(suiteName, ...testNames) {
  try {
    console.log("Running suite...");
    await testSuite(suiteName, ...testNames); // wait 1 second
    const testsNum = testNames.length;        // just a number, no await
    console.log(`Suite ${suiteName} complete — ${testsNum} tests ran`);
  } catch (err) {
    console.log("Error:", err.message);
  }
}


runTestSuite("Regression Suite", "Login test", "API test", "Functionality test");
