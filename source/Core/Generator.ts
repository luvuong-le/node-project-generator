import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { CombineQuestions } from '@modules/Core/Questions';
import { IGenerator } from '@modules/Interfaces/IGenerator';
import { PromptResult } from '@modules/Types/PromptResult';
import { Question } from '@modules/Types/Question';
import Options from '@modules/Enums/Options';
import inquirer = require('inquirer');
import { Utility } from '@modules/Core/Utility';
import { ConfigResult } from '@modules/Types/ConfigResult';

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
    generate(action: PromptResult, type: Options, config: ConfigResult): void {
        switch (type) {
            case Options.Project:
                Utility.generateProject(action, type, config);
                break;
            case Options.Code:
                Utility.generateCode(action, type, config);
                break;
            default:
                break;
        }
    }

    /**
     * @param  {Question[]} question
     * @returns Promise<>
     */
    prompt(question: Question[]): Promise<any> {
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

            const config: ConfigResult = await this.prompt(
                this.questions.ProjectConfig
            );

            this.generate(projectToGenerate, Options.Project, config);
        }

        if (generatorType.option === Options.Code) {
            const codeToGenerate: PromptResult = await this.prompt(
                this.questions.Code
            );

            // TODO: Create Generate Function for Code Generation
            this.generate(codeToGenerate, Options.Code, {});
        }
    }
}

export const generator: Generator = Generator.Instance();
