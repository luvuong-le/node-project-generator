import { Utility } from '@modules/Core//Utility';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { questions } from '@modules/Core/Questions';
import { IGenerator } from '@modules/Interfaces/IGenerator';
import { PromptResult } from '@modules/Types/PromptResult';
import { Question } from '@modules/Types/Question';
import Options from '@modules/Enums/Options';
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

    generate(action: PromptResult, type: string): void {
        switch (type) {
            case 'Project':
                Utility.create(action, type);
                break;
            case 'Code':
                Utility.create(action, type);
                break;
            default:
                break;
        }
    }

    prompt(question: Question[]): Promise<PromptResult> {
        return inquirer.prompt(question as any);
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
        const generatorType: PromptResult = await this.prompt(
            this.questions.Options
        );

        if (generatorType.option === Options.Code) {
            const codeToGenerate: PromptResult = await this.prompt(
                this.questions.Projects
            );

            this.generate(codeToGenerate, Options.Code);
        }

        if (generatorType.option === Options.Project) {
            const projectToGenerate: PromptResult = await this.prompt(
                this.questions.Code
            );

            this.generate(projectToGenerate, Options.Project);
        }
    }
}

export const generator: Generator = Generator.Instance();
