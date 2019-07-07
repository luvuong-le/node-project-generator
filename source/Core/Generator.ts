import { Utility } from '@modules/Core//Utility';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { CombineQuestions } from '@modules/Core/Questions';
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

    /**
     * @returns QuestionContainer
     */
    getQuestions(): QuestionContainer {
        return CombineQuestions();
    }

    /**
     * @param  {PromptResult} action
     * @param  {string} type
     * @returns void
     */
    generate(action: PromptResult, type: string, config: PromptResult): void {
        switch (type) {
            case 'Project':
                Utility.generateProject(action, type, config);
                break;
            case 'Code':
                Utility.generateCode(action, type);
                break;
            default:
                break;
        }
    }

    /**
     * @param  {Question[]} question
     * @returns Promise
     */
    prompt(question: Question[]): Promise<PromptResult> {
        return inquirer.prompt(question as any);
    }

    /**
     * @returns Generator
     */
    static Instance(): Generator {
        if (Generator.instance == null) {
            Generator.instance = new Generator();
        }
        return Generator.instance;
    }

    /**
     * @returns void
     */
    static Configure(): void {
        Generator.Instance();
    }

    /**
     * @returns Promise
     */
    async run(): Promise<void> {
        const generatorType: PromptResult = await this.prompt(
            this.questions.Options
        );

        if (generatorType.option === Options.Project) {
            const projectToGenerate: PromptResult = await this.prompt(
                this.questions.Projects
            );

            const projectName: PromptResult = await this.prompt(
                this.questions.ProjectName
            );

            this.generate(projectToGenerate, Options.Project, projectName);
        }

        if (generatorType.option === Options.Code) {
            const codeToGenerate: PromptResult = await this.prompt(
                this.questions.Code
            );

            // TODO: Create Generate Function for Code Generation
            // this.generate(codeToGenerate, Options.Code);
        }
    }
}

export const generator: Generator = Generator.Instance();
