import inquirer from 'inquirer';
import * as fs from 'fs';
import { dirname } from 'path';

const projects: Array<String> = ['express-server', 'react', 'vue'];

const questions: Array<Object> = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: projects
    }
];

inquirer.prompt(questions).then(answers => {
    console.log(answers);
});
