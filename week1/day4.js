
// Day 4 - Conditionals & Loops

const bugs = [
  { id: 1, title: "Login crashes", severity: "critical", status: "open", assignedTo: null },
  { id: 2, title: "Footer typo", severity: "low", status: "closed", assignedTo: "Ali" },
  { id: 3, title: "API returns 500", severity: "critical", status: "open", assignedTo: "Sara" },
  { id: 4, title: "Slow dashboard", severity: "high", status: "open", assignedTo: null },
  { id: 5, title: "Wrong button color", severity: "low", status: "open", assignedTo: "Abdullah" },
];

for (const bug of bugs){
    const assigne = bug.assignedTo || "Unassignde";
    const urgency = bug.severity === "critical" ? "urgent" : "normal";
    console.log(`[${urgency}] Bug #${bug.id} - ${bug.title} | Assign to" ${assigne}`);
}

// 2. Count by severity using for...in
const counts = { critical: 0, high: 0, low: 0 };

for (const bug of bugs){
    if (bug.severity in counts){
        counts[bug.severity]++;
    }
}
console.log("Severity Counts", counts);

// 3. Optional chaining practice
const report = { meta: { author: "Abdullah" } };
console.log(report.meta?.author);    // "Abdullah"
console.log(report.stats?.passed);   // undefined — no crash!

 function triageBugs(bugs){
    for(const bug of bugs){
        if (bug.severity === "critical" && bug.status == "open"){
            console.log(`Esclate : ${bug.title}`);
        }
        else if (bug.severity === "high" && bug.status == "open"){
            console.log(`Monitor : ${bug.title}`);
        }
        else{
            console.log(`Skip: : ${bug.title}`);
        }
}
 }

triageBugs(bugs);
