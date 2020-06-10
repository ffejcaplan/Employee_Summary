const inquirer = require("inquirer");
const express = require("express");
const app = express();
const path = require("path");
const merge = require("lodash.merge");
const fs = require("fs");
const htmlRender = require("./lib/htmlRender");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {});

const selectRole = [
  {
    type: "list",
    name: "role",
    message: "Select Your Job Type",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];

const addEmployees = () => {
  inquirer.prompt(selectRole).then((response) => {
    if (response.role == "Engineer") {
      inquirer.prompt(engineerQuestions).then((answers2) => {
        answersArray.push(answers2);
        console.log(answersArray);
        addEmployees();
      });
    } else if (response.role == "Intern") {
      inquirer.prompt(internQuestions).then((answers2) => {
        answersArray.push(answers2);
        console.log(answersArray);
        addEmployees();
      });
    } else {
      htmlRender.render(answersArray);
    }
  });
};

//object Engineer questions
const engineerQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "input", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "input", name: "github", message: "GitHub Account" },
];
//object Manager questions
const managerQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "input", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "number", name: "officeNumber", message: "Office Number" },
];

//object intern questions
const internQuestions = [
  { type: "input", name: "name", message: "Name" },
  { type: "input", name: "id", message: "ID:" },
  { type: "input", name: "email", message: "Email" },
  { type: "input", name: "school", message: "School" },
];
const answersArray = [];
//inquirer select role
inquirer.prompt(managerQuestions).then((answers) => {
  answersArray.push(answers);
  addEmployees();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./templates/main.html"));
});

//if x role is selected
//inquirer that object of questions
