import { CommandPromptResult } from './../Types/CommandPromptResult';
import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { CombineQuestions } from '@modules/Core/Questions';
import { IGenerator } from '@modules/Interfaces/IGenerator';
import { PromptResult } from '@modules/Types/PromptResult';
import { Question } from '@modules/Types/Question';
import LogHelper from '@modules/Helpers/LogHelper';
import Options from '@modules/Enums/Options';
import Code from '@modules/Enums/Code';
import Projects from '@modules/Enums/Projects';
import GeneratorUtility from '@modules/Core/GeneratorUtility';

import inquirer = require('inquirer');
import chalk from 'chalk';
import _ from 'lodash';

export default class Generator implements IGenerator {
    static instance: Generator;
    questions: QuestionContainer;

    constructor() {
        this.questions = this.getQuestions();
    }

    /**
     * Returns all the questions to ask the user
     * @returns {QuestionContainer}
     */
    getQuestions(): QuestionContainer {
        return CombineQuestions();
    }

    /**
     * Begins the generation of the project/code
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
     * Logs out all possible options depending on user choice [Project | Code]
     * @param  {string} generatorType
     * @returns void
     */
    generateList(generatorType: string): void {
        if (generatorType.toLowerCase() === Options.Project.toLowerCase()) {
            LogHelper.listOptions(Options.Project, Projects, chalk.blue);
        } else if (
            generatorType.toLowerCase() === Options.Project.toLowerCase()
        ) {
            LogHelper.listOptions(Options.Code, Code, chalk.blue);
        } else {
            LogHelper.listOptions(Options.Code, Code, chalk.blue);
            LogHelper.listOptions(Options.Project, Projects, chalk.blue);
        }
    }

    /**
     * Prompts the user based on a list of questions
     * @param  {Question[]} question
     * @returns {Promise<PromptResult>}
     */
    prompt(question: Question[]): Promise<PromptResult> {
        return inquirer.prompt(question as inquirer.Questions<PromptResult>);
    }

    /**
     * Returns an instance of the generator
     * @returns Generator
     */
    static Instance(): Generator {
        if (Generator.instance == null) {
            Generator.instance = new Generator();
        }
        return Generator.instance;
    }

    /**
     * Creates a new instance of the generator class
     * @description {Creates a new instance of generator class}
     * @returns {Generator}
     */
    static Configure(): Generator {
        return Generator.Instance();
    }

    /**
     * Runs the generator based on the cli arguments
     * @param  {CommandPromptResult} _arguments
     * @returns Promise
     */
    async runViaCommand(_arguments: CommandPromptResult): Promise<void> {
        switch (_arguments.command[0]) {
            case 'new':
                if (
                    _arguments.generatorType.toLowerCase() ===
                    Options.Project.toLowerCase()
                ) {
                    await this.generate(
                        {
                            option: _arguments.specifiedToGenerate,
                            generate: true,
                            projectName: _arguments.name || '',
                            projectGeneratePath: _arguments.path || '',
                            customTemplatePath:
                                _arguments.templatePath || undefined,
                            gitInit: _arguments.gitInit || false,
                            npmInstall: _arguments.npmInit || false
                        },
                        Options.Project
                    );
                }

                if (
                    _arguments.generatorType.toLowerCase() ===
                    Options.Code.toLowerCase()
                ) {
                    await this.generate(
                        {
                            option: _arguments.specifiedToGenerate,
                            generate: true,
                            fileName: _arguments.name || '',
                            codeGeneratePath: _arguments.path || '',
                            customTemplatePath:
                                _arguments.templatePath || undefined
                        },
                        Options.Code
                    );
                }

                break;
            case 'list':
                this.generateList(_arguments.generatorType);
                break;
            default:
                LogHelper.write('[Error]: Unknown Command', chalk.red);
        }
    }

    /**
     * Terminates the application
     * @returns void
     */
    terminate(): void {
        LogHelper.write(
            '[Info]: Not Generating Project... Exiting Application',
            chalk.blue
        );
        process.exit(0);
    }

    /**
     * Runs the generator in user input mode
     * @returns {Promise<void>}
     */
    async run(): Promise<void> {
        const generatorType: PromptResult = await this.prompt(
            this.questions.Options
        );

        try {
            if (generatorType.option === Options.Project) {
                const projectPromptResults: PromptResult = await this.prompt(
                    this.questions.Projects
                );

                await this.generate(projectPromptResults, Options.Project);
            }

            if (generatorType.option === Options.Code) {
                const codePromptResults: PromptResult = await this.prompt(
                    this.questions.Code
                );

                await this.generate(codePromptResults, Options.Code);
            }

            if (generatorType.option === Options.Exit) {
                return this.terminate();
            }
        } catch (e) {
            return this.terminate();
        }
    }
}

export const generator: Generator = Generator.Instance();
