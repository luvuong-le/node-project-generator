import { IGenerator } from './../Interfaces/IGenerator';
import Projects from '../Enums/Projects';
import inquirer = require('inquirer');
import { Question } from '../Types/Question';

export default class Generator implements IGenerator {
    projects: string[];
    questions: any;

    constructor() {
        this.projects = this.getProjects();
        this.questions = this.getQuestions();
    }

    getProjects(): string[] {
        const projects: string[] = [];

        for (let project in Projects) {
            projects.push(project);
        }

        return projects;
    }

    getQuestions(): Question[] {
        return this.questions;
    }

    generate() {}

    prompt() {
        inquirer.prompt(this.questions).then(answers => {
            console.log(answers);
            return answers;
        });
    }

    static run() {
        console.log('Running Generator');
    }
}
