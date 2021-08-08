const fs = require("fs");
const generatePage = require("./src/page-template.js");

const profileDataArgs = process.argv.slice(2, process.argv.length);
const name = profileDataArgs[0];
const github = profileDataArgs[1];



fs.writeFile("index.html", generatePage(name,github), err => {
  if (err) throw err;

  console.log("Portfolio complete! Check out index.html to see the output!");
});


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
