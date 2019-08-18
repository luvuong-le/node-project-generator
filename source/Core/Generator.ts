import { CommandPromptResult } from './../Types/CommandPromptResult';
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
import { Argv } from 'yargs';

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
     * @returns {boolean}
     */
    async generate(
        promptResult: PromptResult,
        generatorType: Options
    ): Promise<boolean> {
        switch (generatorType) {
            case Options.Project:
                return GeneratorUtility.generateProject(
                    promptResult,
                    generatorType
                );
            case Options.Code:
                return GeneratorUtility.generateCode(
                    promptResult,
                    generatorType
                );
            default:
                LogHelper.write(
                    '[Error]: Not a valid type for generation',
                    chalk.red
                );
                return false;
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

    async runViaCommand(_arguments: CommandPromptResult): Promise<void> {
        console.log(_arguments);

        switch (_arguments.command[0]) {
            case 'new':
                if (
                    _arguments.generatorType === Options.Project.toLowerCase()
                ) {
                    await this.generate(
                        {
                            option: _arguments.specifiedToGenerate,
                            generate: true,
                            projectName: _arguments.name || '',
                            projectGeneratePath: _arguments.path || '',
                            gitInit: _arguments.gitInit || false,
                            npmInstall: _arguments.npmInit || false
                        },
                        Options.Project
                    );
                }

                if (_arguments.generatorType === Options.Code.toLowerCase()) {
                    await this.generate(
                        {
                            option: _arguments.specifiedToGenerate,
                            generate: true,
                            fileName: _arguments.name || '',
                            projectGeneratePath: _arguments.path || ''
                        },
                        Options.Code
                    );
                }

                break;
            case 'list':
                // Console log a list of projects to user here || Tree heirarchy
                break;
            default:
                LogHelper.write('[Error]: Unknown Command', chalk.red);
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async run(): Promise<void> {
        const generatorType: PromptResult = await this.prompt(
            this.questions.Options
        );

        let generationResult: boolean = false;

        try {
            if (generatorType.option === Options.Project) {
                const projectPromptResults: PromptResult = await this.prompt(
                    this.questions.Projects
                );

                generationResult = await this.generate(
                    projectPromptResults,
                    Options.Project
                );
            }

            if (generatorType.option === Options.Code) {
                const codePromptResults: PromptResult = await this.prompt(
                    this.questions.Code
                );

                generationResult = await this.generate(
                    codePromptResults,
                    Options.Code
                );
            }
        } catch (e) {
            LogHelper.write(
                '[Info]: Not Generating Project... Exiting Application',
                chalk.blue
            );
            process.exit(0);
        }

        // if (generationResult === false) {
        //     return this.run();
        // }
    }
}

export const generator: Generator = Generator.Instance();
