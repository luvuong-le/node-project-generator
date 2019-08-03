import LogHelper from '@modules/Helpers/LogHelper';
import {
    CodeFileDetails,
    ProjectFileDetails
} from '@modules/Types/FileDetails';
import { PromptResult } from '@modules/Types/PromptResult';
import { generator } from '@modules/Core/Generator';
import Options from '@modules/Enums/Options';
import ShellCommands from '@modules/Enums/ShellCommands';
import StringHelper from '@modules/Helpers/StringHelper';
import BaseFileHelper from '@modules/Abstract/BaseFileHelper';

import shell from 'shelljs';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default class FileHelper extends BaseFileHelper {
    private constructor() {
        super();
    }

    /**
     * @param  {CodeFileDetails} fileDetails
     * @param  {PromptResult} promptResult
     * @returns {void}
     */
    static generateFile(
        fileDetails: CodeFileDetails,
        promptResult: PromptResult
    ): void {
        fs.copyFile(
            fileDetails.pathToFile,
            fileDetails.newFileLocation,
            (err: Error) => {
                if (err) LogHelper.write(err.message, chalk.red);

                LogHelper.write(
                    `\n[Success] Copied ${fileDetails.fileName} to ${
                        fileDetails.newFileLocation
                    }`,
                    chalk.green
                );

                // Replace file contents depending on filetype
                fs.readFile(
                    fileDetails.newFileLocation,
                    'utf8',
                    (err: Error, data: string) => {
                        if (err) {
                            LogHelper.write(err.message, chalk.red);
                            generator.run();
                        }

                        if (promptResult.fileName) {
                            FileHelper.replaceStringInFile(
                                StringHelper.uppercaseCamelCase(
                                    promptResult.fileName
                                ),
                                /{ControllerName}/i,
                                data,
                                fileDetails.newFileLocation
                            );
                        }

                        LogHelper.write(
                            `\n[Success] Generated ${fileDetails.fileType}\n`,
                            chalk.green
                        );
                    }
                );
            }
        );
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {ProjectFileDetails} projectDetails
     * @returns {void}
     */
    static generateProject(
        promptResult: PromptResult,
        projectDetails: ProjectFileDetails
    ): void {
        // Perform the copy
        fs.copy(
            projectDetails.directoryToCopy,
            projectDetails.newDirectory,
            (err: Error) => {
                if (err) {
                    LogHelper.write(
                        `\n[Error]: Could not perform copy ${err.message}`,
                        chalk.red
                    );
                    generator.run();
                }

                LogHelper.write(
                    '\n[Success]: Successfully generated project',
                    chalk.green
                );
            }
        );

        // Perform Further actions
        if (promptResult.gitInit) {
            shell.exec(
                ShellCommands.GIT_INIT,
                (code: number, stdout: string, stderr: Error) => {
                    if (stderr)
                        return LogHelper.write(stderr.message, chalk.red);

                    LogHelper.write(
                        '\n[Success]Git Repo Initialized',
                        chalk.green
                    );
                }
            );
        }

        if (promptResult.npmInstall) {
            // Change Directory and install npm
            shell.cd(projectDetails.newDirectory);

            const spinner: ora.Ora = ora(
                '\nRunning Package Install...\n'
            ).start();

            shell.exec(
                ShellCommands.NPM_INSTALL,
                (code: number, stdout: string, stderr: Error) => {
                    LogHelper.write(`\nProgram output: ${stdout}`, chalk.blue);

                    LogHelper.write(
                        `\nProgram errors: ${stderr.message}`,
                        chalk.red
                    );

                    spinner.stop();

                    LogHelper.write(
                        'Package Install Run Successfully',
                        chalk.green
                    );
                }
            );
        } else {
            LogHelper.write('\n[Info]: Not Running NPM Install', chalk.blue);
        }
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {CodeFileDetails}
     */
    static getFileDetails(
        promptResult: PromptResult,
        generatorType: Options
    ): CodeFileDetails {
        const fileType: string = promptResult.option;
        const fileName: string = FileHelper.getFileName(
            generatorType,
            fileType
        );
        const currentDirectory: string = process.cwd();
        const pathToFile: string = path.resolve(
            __dirname,
            '../../templates',
            generatorType.toLowerCase(),
            fileName
        );

        const newFileLocation: string = path.resolve(
            currentDirectory,
            promptResult.codeGeneratePath || '',
            `${promptResult.fileName}${path.extname(pathToFile)}` || ''
        );

        const codeFolderToGenerate: string = path.resolve(
            currentDirectory,
            promptResult.codeGeneratePath || ''
        );

        return {
            fileType,
            fileName,
            currentDirectory,
            pathToFile,
            newFileLocation,
            codeFolderToGenerate
        };
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {ProjectFileDetails}
     */
    static getProjectDetails(
        promptResult: PromptResult,
        generatorType: Options
    ): ProjectFileDetails {
        const currentDirectory: string = process.cwd();
        const newDirectory: string = `${currentDirectory}/${
            promptResult.projectName
        }`;

        const directoryToCopy: string = path.resolve(
            __dirname,
            '../../templates',
            generatorType.toLowerCase(),
            promptResult.option.toLowerCase()
        );

        return {
            currentDirectory,
            newDirectory,
            directoryToCopy
        };
    }

    /**
     * @param  {string} text
     * @param  {RegExp} regex
     * @param  {string} data
     * @param  {string} fileLocation
     * @returns {void}
     */
    static replaceStringInFile(
        text: string,
        regex: RegExp,
        data: string,
        fileLocation: string
    ): void {
        let result: string = data.replace(regex, text);

        fs.writeFile(fileLocation, result, 'utf8', (err: Error) => {
            if (err) return LogHelper.write(err.message, chalk.red);
        });
    }

    /**
     * @param  {string} generatorType
     * @param  {string} fileType
     * @returns {string}
     */
    static getFileName(generatorType: string, fileType: string): string {
        const folder: string = path.resolve(
            __dirname,
            '../../templates',
            generatorType.toLowerCase()
        );

        fs.readdir(folder, (err: Error, files: string[]) => {
            if (err) return LogHelper.write(err.message, chalk.red);

            files.forEach(file => {
                if (path.basename(file) === fileType) {
                    return file;
                }
            });
        });

        // Return default as JS file
        return `${fileType}.js`;
    }
}
