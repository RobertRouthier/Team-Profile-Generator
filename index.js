const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const employeeArr = [];

function init() {
  createManager();
}

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the managers name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the managers ID number?",
      },

      {
        type: "input",
        name: "managerEmail",
        message: "What is the managers email?",
      },

      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the managers office number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      employeeArr.push(manager);
      addEmployees();
    });
}

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        choices: ["New Engineer", "New Intern", "Exit"],
      },
    ])
    .then((answer) => {
      switch (answer.whatToDo) {
        case "New Engineer":
          addEngineer();
          break;
        case "New Intern":
          addIntern();
          break;
        default:
          exit();
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineers name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineers ID number?",
      },

      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineers email?",
      },

      {
        type: "input",
        name: "engineerGitHub",
        message: "What is the engineers Github?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGitHub
      );
      employeeArr.push(engineer)
    });
}
function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the intern name?",
        },
        {
          type: "input",
          name: "internrId",
          message: "What is the intern ID number?",
        },
  
        {
          type: "input",
          name: "internEmail",
          message: "What is the intern email?",
        },
  
        {
          type: "input",
          name: "internSchool",
          message: "What is the interns school?",
        },
      ])
      .then((answers) => {
        const intern= new intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        employeeArr.push(intern)
      });
  }



function createCard(employee){
    
    return  `
        <div class = "card">
            <h3>${employee.name}</h3>
            <h4>${employee.role}</h4>

            <p>${employee.id}</p>
            <p>${employee.email}}</p>
            <p>${employee.managerOfficeNumber || employee.engineerGitHub || employee.school}</p>
        </div>
    `
}
function createHtml(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${employeeArr.map(createCard)}
    </body>
    </html>
    `
}

fs.writeFileSync("/dist/index.html", createHtml())
init();
