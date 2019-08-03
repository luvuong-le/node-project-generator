import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { CombineQuestions } from '@modules/Core/Questions';
import { IGenerator } from '@modules/Interfaces/IGenerator';
import { PromptResult } from '@modules/Types/PromptResult';
import { Question } from '@modules/Types/Question';
import LogHelper from '@modules/Helpers/LogHelper';
import Options from '@modules/Enums/Options';
import GeneratorUtility from '@modules/Core/GeneratorUtility';

import inquirer = require('inquirer');
import chalk from 'chalk';

export default class Generator implements IGenerator {
    static instance: Generator;
    questions: QuestionContainer;

    constructor() {
        this.questions = this.getQuestions();
    }

    /**
     * @returns {QuestionContainer}
     */
    getQuestions(): QuestionContainer {
        return CombineQuestions();
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {void}
     */
    generate(promptResult: PromptResult, generatorType: Options): void {
        switch (generatorType) {
            case Options.Project:
                GeneratorUtility.generateProject(promptResult, generatorType);
                break;
            case Options.Code:
                GeneratorUtility.generateCode(promptResult, generatorType);
                break;
            default:
                LogHelper.write(
                    '[Error]: Not a valid type for generation',
                    chalk.red
                );
                break;
        }
    }

    /**
     * @param  {Question[]} question
     * @returns {Promise<PromptResult>}
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
     * @description {Creates a new instance of generator class}
     * @returns {Generator}
     */
    static Configure(): Generator {
        return Generator.Instance();
    }

    /**
     * @returns {Promise<void>}
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

export const generator: Generator = Generator.Configure();
