const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const fs = require("fs");

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
      console.log("SUCCESS, you have added a manager");
      addEmployees();
    });
}

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        choices: [
          "New Engineer",
          "New Intern",
          "I don't want to add any more employees create Team Profile",
        ],
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
      exit(answers);
    })
    .catch((error) => {
      if (error) {
        console.log("There seems to be an error", error);
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
      employeeArr.push(engineer);
      console.log("SUCCESS, you have added an engineer");
      addEmployees();
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
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      employeeArr.push(intern);
      console.log("SUCCESS, you have added an intern");
      addEmployees();
    });
}

function createCard(employees) {
  let html = [];

  employees.map((employee) => {
    html.push(`
      <div class="card employee-card">
        <div class="card-header">
          <h2 class="card-title">${employee.name}</h2>
          <h3 class="card-title">
            <i class="fas fa-mug-hot mr-2"></i>${employee.getRole()}
          </h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">ID: ${employee.id}</li>
            <li class="list-group-item">
              Email: <a href="mailto:${employee.email}">${employee.email}</a>
            </li>
            <li class="list-group-item">Office number: ${employee.getExtra()}</li>
          </ul>
        </div>
      </div>
    `);
  });

  return html.join("");
}
function createHtml() {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
  </head>

  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 jumbotron mb-3 team-heading">
          <h1 class="text-center">My Team</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="team-area col-12 d-flex justify-content-center">
        ${createCard(employeeArr)}
        </div>
      </div>
    </div>
  </body>
</html>

    `;
}

function exit(answers) {
  fs.writeFileSync("./team.html", createHtml());
}
init();
