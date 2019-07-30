import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { CombineQuestions } from '@modules/Core/Questions';
import { IGenerator } from '@modules/Interfaces/IGenerator';
import { PromptResult } from '@modules/Types/PromptResult';
import { Question } from '@modules/Types/Question';
import Options from '@modules/Enums/Options';
import inquirer = require('inquirer');
import Utility from '@modules/Core/Utility';

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
     * @param  {Options} type
     * @param  {Config} config
     * @returns void
     */
    generate(actions: PromptResult, type: Options): void {
        switch (type) {
            case Options.Project:
                Utility.generateProject(actions, type);
                break;
            case Options.Code:
                Utility.generateCode(actions, type);
                break;
            default:
                break;
        }
    }

    /**
     * @param  {Question[]} question
     * @returns Promise<PromptResult>
     */
    prompt(question: Question[]): Promise<PromptResult> {
        return inquirer.prompt(question as inquirer.Questions<PromptResult>);
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
     * @returns Promise<void>
     */
    async run(): Promise<void> {
        const generatorType: PromptResult = await this.prompt(
            this.questions.Options
        );

        if (generatorType.option === Options.Project) {
            const projectPromptResults: PromptResult = await this.prompt(
                this.questions.Projects
            );

            this.generate(projectPromptResults, Options.Project);
        }

        if (generatorType.option === Options.Code) {
            const codePromptResults: PromptResult = await this.prompt(
                this.questions.Code
            );

            this.generate(codePromptResults, Options.Code);
        }
    }
}

export const generator: Generator = Generator.Instance();
