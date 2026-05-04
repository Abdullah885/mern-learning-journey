// Day 3 - Objects & Destructuring

const testReport = {
  id: "RPT-001",
  project: "TheCredentialing Portal",
  engineer: "Muhammad Abdullah Javed",
  summary: {
    total: 50,
    passed: 42,
    failed: 6,
    skipped: 2,
  },
  tags: ["regression", "smoke", "API"],
};

// 1. Destructure top-level fields
const {id,project,engineer} = testReport;
console.log(`Report: ${id} | Project: ${project} | Engineer: ${engineer}`);


// 2. Destructure nested summary
const {summary: {total, passed, failed, skipped}} = testReport;
console.log(`Results: ${passed}/${total} passed, ${failed} failed`);


// 3. Add a new field using spread
const updatedReport = { ...testReport, status: "reviewed", reviewedBy: "Lead QA" };
console.log("Udpdated: ",updatedReport.status, updatedReport.reviewedBy);


// 4. Function using destructured params
function printSummary({project, summary:{total, passed}, engineer}){
    console.log(`${engineer} ran ${total} tests on ${project} - ${passed} passed` );
}

printSummary(testReport);


//Task: Write a function getPassRate that takes the testReport object and returns a string like: "Pass rate: 84%"

function getPassRate({summary: {passed,total}}){
    const rate = (passed/total)*100;
    console.log(`Pass rate: ${rate}%`);
}

getPassRate(testReport);