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
      name: "managerName",
      message: "What is the managers name?",
    },

    {
      type: "input",
      name: "managerName",
      message: "What is the managers name?",
    },

    {
      type: "input",
      name: "managerName",
      message: "What is the managers name?",
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
