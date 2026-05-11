const bugs = [
  { id: 1, title: "Login page crashes",   severity: "critical", status: "open",   assignedTo: "Abdullah" },
  { id: 2, title: "Footer typo",          severity: "low",      status: "closed", assignedTo: null },
  { id: 3, title: "API returns 500",      severity: "critical", status: "open",   assignedTo: null },
  { id: 4, title: "Dashboard loads slow", severity: "high",     status: "open",   assignedTo: "Sara" },
  { id: 5, title: "Wrong button color",   severity: "low",      status: "open",   assignedTo: "Ali" },
  { id: 6, title: "Signup form breaks",   severity: "high",     status: "closed", assignedTo: "Abdullah" },
];

//Challenge 1
function getSummary(bugs) {
  const total      = bugs.length;
  const open       = bugs.filter((bug) => bugs.status === "open").length;
  const closed     = bugs.filter((bug) => bugs.status === "closed").length;
  const critical   = bugs.filter((bug) => bugs.severity === "critical").length;
  const unassigned = bugs.filter((bug) => bugs.assignedTo === null).length;

  console.log({ total, open, closed, critical, unassigned });
}

getSummary(bugs);


//Challenge2

for (const bug of bugs) {
  const emoji = bug.severity === "critical" ? "CRITICAL" 
              : bug.severity === "high"     ? "HIGH" 
              : "LOW";

  const assignee = bug.assignedTo ?? "Unassigned";

  console.log(`${emoji} ${bug.severity.toUpperCase()} | ${bug.title} | Assigned: ${assignee}`);
}


//Challenge3

function getByAssignee(bugs, name) {
  const assignedBugs = bugs.filter((bug) => bug.assignedTo === name);
  console.log(`Bugs assigned to ${name}:`, assignedBugs);
  return assignedBugs;
}

getByAssignee(bugs, "Abdullah");

//Challenge4

function simulateFix(bugId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("done"), 1000);
  });
}

async function markFixed(bugId) {
  try {
    console.log("Running fixation...");
    await simulateFix(bugId); // wait 1 second 
    console.log(`Bug# ${bugId} has been marked as fixed`);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

markFixed(3)


//Challenge5
function generateReport (engineerName, ...bugTitles){
    return{
        engineerName,
        totalBugs : bugTitles.length,
        bugs : bugTitles,
    };
}
const report = generateReport("Abdullah", "Login page crashes", "API returns 500", "Dashboard loads slow");

console.log(`Engineer: ${report.engineerName}`);
console.log(`Bugs reported: ${report.totalBugs}`);
report.bugs.forEach((bug) => console.log(`  - ${bug}`));