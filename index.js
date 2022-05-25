const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs")

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
      console.log('SUCCESS, you have added a manager')
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
    })
    .then((answers) => {
        exit(answers)
        
    })
    .catch((error) => {
        if(error){
            console.log('There seems to be an error', error)
        }
    })
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
      console.log('SUCCESS, you have added an engineer')
      addEmployees()
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
          name: "internId",
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
        const intern= new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        employeeArr.push(intern)
        console.log('SUCCESS, you have added an intern')
        addEmployees()
      });
      
  }





function createCard(employee){
    
    return  `
        <div class = "card">
            <h3 class="card-head">${employee.name}</h3>
            <h4 class="card-head">${employee.getRole()}</h4>

            <p class="card-item">Employee ID:${employee.id}</p>
            <p class="card-item">Employee Email:${employee.email}</p>
            <p class="card-item">${employee.getExtra()}</p>
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
        <title>Team Cards</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div class="header">
          Team Profile
        </div>
        <div class="card-area">
        ${employeeArr.map(createCard)}
        </div>
    </body>
    </html>
    `
    
}

function exit(answers){
fs.writeFileSync("./index.html", createHtml())


}
init();