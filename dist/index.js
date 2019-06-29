"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var projects = ['Node', 'React', 'Vue', 'Custom'];
var questions = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: projects
    }
];
inquirer_1.default.prompt(questions).then(function (answers) {
    console.log(answers);
});
