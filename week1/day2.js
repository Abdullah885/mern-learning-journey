
// Day 2 - Arrays & Array Methods

// Your bug tracker simulation
const bugs = [
    {
        id: 1, title: "Login page crashes", severity: "critical", status: "open"
    },
    {
        id: 2, title: "Footer  typo", severity: "low", status: "closed"
    },
    { 
        id: 3, title: "API returns 500", severity: "critical", status: "open" 
        
    },
    { 
        id: 4, title: "Button color wrong", severity: "low", status: "open"
     },
    { 
        id: 5, title: "Dashboard loads slow", severity: "high", status: "open" 
    },
];


// 1. Get all open bugs
const openBugs = bugs.filter((bug) => bug.status ==="open");
console.log("Open bug:", openBugs);


// 2. Get all bug titles only
const bugTitles = bugs.map((title) => title.title);
console.log("All titles:", bugTitles);


// 3. Find bug with id 3
const thirdBug = bugs.filter((bug)=>bug.id===3);
console.log("Third bug:", thirdBug);


// 4. Add "URGENT:" prefix to all critical bugs
const flagged = 
    bugs.filter((bug)=>bug.severity === "critical")
    .map((bug) => ({...bug, title: "Urgent: "+bug.title}));

console.log("Flagged:",flagged);



//Task: Write a function called getSummary that takes the bugs array and returns an object like this:{ total: 5, open: 4, closed: 1, critical: 2 }

const getSummary = (bugs) =>{
    return{
        total : bugs.length,
        open : bugs.filter((bug) => bug.staus === "open").length,
        closed : bugs.filter((bug) => bug.stautus ==="closed").length,
        critical : bugs.filter((bug) => bug.status ==="criticla").length,
    };
}

console.log("Summary of bugs: ",getSummary(bugs));