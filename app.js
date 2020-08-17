const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



// Objects to house employees
let employees = []
let manager = []
let engineer = []
let intern = []


// Position builders
function managerBuilder(parentA) {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'Please enter the Manager office number.'
                }
            ]
        )
        .then(answer => {
            manager.push(new Manager(parentA.name, parentA.role, parentA.id, parentA.email, answer.officeNumber))
            console.log(manager)
            mainMenu()
        })
        .catch(err => console.log(err))
}

function engineerBuilder(parentA) {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    name: 'github',
                    message: 'Please enter the Engineer github username.'
                }
            ]
        )
        .then(answer => {
            engineer.push(new Engineer(parentA.name, parentA.role, parentA.id, parentA.email, answer.github))
            console.log(engineer)
            mainMenu()
        })
        .catch(err => console.log(err))
}

function internBuilder(parentA) {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    name: 'school',
                    message: 'Please enter the Intern school.'
                }
            ]
        )
        .then(answer => {
            intern.push(new Intern(parentA.name, parentA.role, parentA.id, parentA.email, answer.school))
            console.log(intern)
            mainMenu()
        })
        .catch(err => console.log(err))
}



const employeeBuilder = () => {
    inquirer
        .prompt(
            [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter the Employee name.'
                },
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please enter the Employee id.'
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Please enter the Employee email.'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select the Employee role.',
                    choices: ['Manager', 'Engineer', 'Intern']
                }
            ]
        )
        .then(answer => {
            console.log(answer)
            switch (answer.role) {
                case 'Manager':
                    managerBuilder(answer)
                    break
                case 'Engineer':
                    engineerBuilder(answer)
                    break
                case 'Intern':
                    internBuilder(answer)
                    break
            }
        })
        .catch(err => console.log(err))
}


// Inquirer prompts start
const mainMenu = () => {
    inquirer
        .prompt(
            [
                {
                    type: 'list',
                    name: 'selection',
                    message: 'Please make a selection.',
                    choices: ['Make new Employee', 'Review Employees', 'Print and Exit']
                }
            ]
        )
        .then(answer => {
            console.log(answer)
            switch (answer.selection) {
                case 'Make new Employee':
                    console.log('run employee builder')
                    employeeBuilder()
                    break
                case 'Review Employees':
                    console.log('bring up employee list so far')
                    console.log(`Managers: ${manager}`)
                    console.log(`Engineers: ${engineer}`)
                    console.log(`Interns: ${intern}`)
                    mainMenu()
                    break
                case 'Print and Exit':
                    console.log('Run print and exit function')
                    break
                default:
                    console.log('something went terribly wrong')
                    break
            }
        })
        .catch(err => console.log(err))
}


// start of the world
mainMenu()