const fs = require("fs");
const generatePage = require("./src/page-template.js");
const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      }
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
    =================
    Add a New Project
    =================
  `);

  // if there's no project array, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  };

  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("You need to enter a project name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "description",
      message: "Provide a description of the project. (Required)",
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log("You need to enter a project description!");
          return false
        }
      }
    },
    {
      type: "checkbox",
      name: "languages",
      message: "What did you build with this project? (Check all that apply)",
      choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
    },
    {
      type: "input",
      name: "link",
      message: "Enter the Github link to your project. (Required)",
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log("You need to enter a project GitHub link!");
          return false;
        }
      }
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project?",
      default: false
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile("./index.html", pageHTML, err => {
      if (err) throw new Error(err);

      console.log("Page created!  Check out index.html in this directory to see it!");
    });
  });

// const pageHTML = generatePage(name, github);

// fs.writeFile("index.html", pageHTML, err => {
//   if (err) throw err;

//   console.log("Portfolio complete! Check out index.html to see the output!");
// });


// const printProfileData = profileDataArr => {
//   // this 
//   for (let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
//   };

//   console.log("================");

//   // is the same as 
//   profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);


// using function expression syntax
// const addNums = function(numOne, numTwo) {
//   return numOne + numTwo;
// };

// using new arrow function syntax
// const addNums = (numOne, numTwo) => {
//   return numOne + numTwo;
// };

// if there's only one action, can omit curly braces
// const addNums = (numOne, numTwo) => numOne + numTwo;
// const sum = addNums(5, 3);
// sum would be 8
// this is implicit return, can omit if that's the only action

// this has two actions, console.log and return so use traditional style
// const addNums = (numOne, numTwo) => {
//   console.log(numOne, numTwo);
//   return numOne + numTwo;
// }
