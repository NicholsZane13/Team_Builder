const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page.js");

// classes required
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// answers for the questions
const newMembers = [];

// Array object questions asked in CLI to user
const questions = async () => {
  const answers = await inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
      if (answers.role === "Manager") {
        const managerResponse = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your office number",
              name: "officeNumber",
            },
          ])
          const newManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerResponse.officeNumber
          );
          newMembers.push(newManager);
          
      } else if (answers.role === "Engineer") {
        const engineerResponse = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your GitHub user name?",
              name: "github",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              engineerResponse.github
            );
            newMembers.push(newEngineer);
          
      } else if (answers.role === "Intern") {
        const internResponse = await inquirer
          .prompt([
            {
              type: "input",
              message: "What university did you attend?",
              name: "school",
            },
          ])
          
          const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internResponse.school
          );
          newMembers.push(newIntern);          
      } 

}; 
//Asking to add more members or create the team
async function promptQuestions() {
    await questions()
      
    
    const addMemberAns = await inquirer
      .prompt([
        {
          name:'addMember',
          type: 'list',
          choices: ['Add a new member', 'Create team'],
          message: "What would you like to do next?"
        }
      ])
  
      if (addMemberAns.addMember === 'Add a new member') {
        return promptQuestions()
      }
      return newTeam();
  }  
  
  promptQuestions();
  
  function newTeam () {
    console.log("new guy", newMembers)
    fs.writeFileSync(
      "./output/index.html",
      generateTeam(newMembers),
      "utf-8"
    );
  }