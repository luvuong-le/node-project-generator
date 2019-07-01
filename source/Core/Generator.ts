import { QuestionContainer } from './../Types/Question';
import { questions } from './Questions';
import { IGenerator } from './../Interfaces/IGenerator';
import inquirer = require('inquirer');

export default class Generator implements IGenerator {
    static instance: Generator;
    questions: QuestionContainer;

    constructor() {
        this.questions = this.getQuestions();
    }

    getQuestions(): QuestionContainer {
        return questions();
    }

    generate(): void {}

    prompt(question: any): Promise<unknown> {
        return inquirer.prompt(question);
    }

    static Instance(): Generator {
        if (Generator.instance == null) {
            Generator.instance = new Generator();
        }
        return Generator.instance;
    }

    static Configure(): void {
        Generator.Instance();
    }

    async run() {
        console.log('Running Generator');
        const res = await this.prompt(this.questions.Options);

        console.log(res);
    }
}

export const generator: Generator = Generator.Instance();
