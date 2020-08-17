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



// Array to house employees objects
let employees = []

// Role builders
// Manager Builder
function managerBuilder(parentA) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Please enter the Manager office number.'
            }
        ])
        .then(answer => {
            employees.push(new Manager(parentA.name, parentA.id, parentA.email, answer.officeNumber))
            console.log('New manager added.')
            mainMenu()
        })
        .catch(err => console.log(err))
}

// Engineer Builder
function engineerBuilder(parentA) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'github',
                message: 'Please enter the Engineer github username.'
            }
        ])
        .then(answer => {
            employees.push(new Engineer(parentA.name, parentA.id, parentA.email, answer.github))
            console.log('New engineer added.')
            mainMenu()
        })
        .catch(err => console.log(err))
}

// Intern Builder
function internBuilder(parentA) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'school',
                message: 'Please enter the Intern school.'
            }
        ])
        .then(answer => {
            employees.push(new Intern(parentA.name, parentA.id, parentA.email, answer.school))
            console.log('New intern added.')
            mainMenu()
        })
        .catch(err => console.log(err))
}



const employeeBuilder = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Please select the Employee role.',
                choices: ['Manager', 'Engineer', 'Intern']
            },
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
            }
        ])
        .then(answer => {
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
        .prompt([
                {
                    type: 'list',
                    name: 'selection',
                    message: 'Please make a selection.',
                    choices: ['Make new Employee', 'Review Employees', 'Print and Exit']
                }
        ])
        .then(answer => {
            console.log(answer)
            switch (answer.selection) {
                // Runs Builders
                case 'Make new Employee':
                    employeeBuilder()
                    break
                // Check employees array
                case 'Review Employees':
                    console.log(employees)
                    mainMenu()
                    break
                // Render
                case 'Print and Exit':
                    console.log('team.html is in the output folder.')
                    fs.writeFileSync(outputPath, render(employees))
                    break
                // This should never run
                default:
                    console.log('something went terribly wrong')
                    break
            }
        })
        .catch(err => console.log(err))
}


// start of the world
mainMenu()