const Manager = require("./lib/Manager");
const inquirer = require("inquirer");

function init() {
  createManager();
}

function createManager() {
  inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "What is the managers name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the managers ID number?",
    },

    {
      type: "input",
      name: "managerEmail",
      message: "What is the managers email?",
    },

    {
      type: "input",
      name: "managerNumber",
      message: "What is the managers office number?",
    }
  ])
  .then(answers =>{
      const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
      );
      employeeArr.push(manager)
      addEmployees()
  });
}

function addEmployees(){
    inquirer.prompt([
       {
        type: 'list',
        name: 'what to do?',
        message: ''
    }
    ])
}
