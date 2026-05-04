const myProfile = {
    name: "Muhammd Abdullah Javed",
    role: "QA Engineer -> MERN Developer",
    skills: ["Cypress", "Playwright", "Selenium"],
    goal: "Full Stack Developer"
};

const intorduce = (profile) => {
    return `Hello my name is ${profile.name}. Currently a ${profile.role},`;
};

console.log(intorduce(myProfile));
console.log("My skills are:", myProfile.skills);
