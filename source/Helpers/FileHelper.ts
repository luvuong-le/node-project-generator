import { PromptResult } from './../Types/PromptResult';
import LogHelper from '@modules/Helpers/LogHelper';
import {
    CodeFileDetails,
    ProjectFileDetails
} from '@modules/Types/FileDetails';
import Options from '@modules/Enums/Options';
import ShellCommands from '@modules/Enums/ShellCommands';
import StringHelper from '@modules/Helpers/StringHelper';
import BaseFileHelper from '@modules/Abstract/BaseFileHelper';

import shell from 'shelljs';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default abstract class FileHelper extends BaseFileHelper {
    /**
     * @param  {CodeFileDetails} fileDetails
     * @param  {PromptResult} promptResult
     * @returns {boolean}
     */
    public static generateFile(
        fileDetails: CodeFileDetails,
        promptResult: PromptResult
    ): Promise<boolean> {
        return fs
            .copyFile(fileDetails.pathToFile, fileDetails.newFileLocation)
            .then(async () => {
                LogHelper.write(
                    `\n[Success] Copied ${fileDetails.fileName} to ${
                        fileDetails.newFileLocation
                    }`,
                    chalk.green
                );

                try {
                    const data: string = await fs.readFile(
                        fileDetails.newFileLocation,
                        'utf8'
                    );

                    if (promptResult.fileName) {
                        await FileHelper.replaceStringInFile(
                            StringHelper.uppercaseCamelCase(
                                promptResult.fileName
                            ),
                            /{ControllerName}/i,
                            data,
                            fileDetails.newFileLocation
                        );
                    }
                    /* istanbul ignore next */
                    LogHelper.write(
                        `\n[Success]: Generated ${fileDetails.fileType}\n`,
                        chalk.green
                    );
                } catch (err) {
                    /* istanbul ignore next */
                    LogHelper.write(err.message, chalk.red);
                }

                return true;
            })
            .catch((err: Error) => {
                if (err) {
                    LogHelper.write(err.message, chalk.red);
                }
                return false;
            });
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {ProjectFileDetails} projectDetails
     * @returns {boolean}
     */
    public static generateProject(
        promptResult: PromptResult,
        projectDetails: ProjectFileDetails
    ): Promise<boolean> {
        // Perform the copy
        return fs
            .copy(projectDetails.directoryToCopy, projectDetails.newDirectory)
            .then(() => {
                // Perform Further actions
                if (promptResult.gitInit) {
                    shell.exec(
                        ShellCommands.GIT_INIT,
                        /* istanbul ignore next */
                        (code: number, stdout: string, stderr: Error) => {
                            /* istanbul ignore next */
                            if (stderr)
                                /* istanbul ignore next */
                                return LogHelper.write(
                                    stderr.message,
                                    chalk.red
                                );

                            /* istanbul ignore next */
                            LogHelper.write(
                                '\n[Success]Git Repo Initialized',
                                chalk.green
                            );
                        }
                    );
                } else {
                    /* istanbul ignore next */
                    LogHelper.write(
                        '\n[Info]: Not Running Git Init',
                        chalk.blue
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
                            LogHelper.write(
                                `\nProgram output: ${stdout}`,
                                chalk.blue
                            );

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
                    /* istanbul ignore next */
                    LogHelper.write(
                        '\n[Info]: Not Running NPM Install',
                        chalk.blue
                    );
                }

                LogHelper.write(
                    `\n[Success]: Generated Project\n`,
                    chalk.green
                );
                return true;
            })
            .catch((err: Error) => {
                if (err) {
                    LogHelper.write(
                        `\n[Error]: Could not perform copy ${err.message}`,
                        chalk.red
                    );
                }

                return false;
            });
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {CodeFileDetails}
     */
    public static getFileDetails(
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
    public static getProjectDetails(
        promptResult: PromptResult,
        generatorType: Options
    ): ProjectFileDetails {
        const currentDirectory: string = process.cwd();

        let newDirectory = '';

        if (promptResult.projectGeneratePath) {
            newDirectory = path.resolve(
                currentDirectory,
                promptResult.projectGeneratePath || '',
                `${promptResult.projectName}` || ''
            );
        } else {
            newDirectory = `${currentDirectory}/${promptResult.projectName}`;
        }

        const directoryToCopy: string = path.resolve(
            __dirname,
            '../../templates',
            generatorType.toLowerCase(),
            promptResult.option.toLowerCase()
        );

        return {
            currentDirectory,
            newDirectory,
            directoryToCopy,
            projectFolderToGenerate: promptResult.projectGeneratePath || ''
        };
    }

    /**
     * @param  {string} text
     * @param  {RegExp} regex
     * @param  {string} data
     * @param  {string} fileLocation
     * @returns {void}
     */
    public static async replaceStringInFile(
        text: string,
        regex: RegExp,
        data: string,
        fileLocation: string
    ): Promise<string> {
        let result: string = data.replace(regex, text);

        return new Promise((resolve, reject) => {
            fs.writeFile(fileLocation, result, 'utf8', (err: Error) => {
                if (err) {
                    /* istanbul ignore next */
                    LogHelper.write(err.message, chalk.red);
                    reject(err.message);
                }

                resolve();
            });
        });
    }

    /**
     * @param  {string} generatorType
     * @param  {string} fileType
     * @returns {string}
     */
    public static getFileName(
        generatorType: string,
        fileType: string,
        folderPath?: string
    ): string {
        const folder: string = !folderPath
            ? path.resolve(
                  __dirname,
                  '../../templates',
                  generatorType.toLowerCase()
              )
            : folderPath;

        fs.readdir(folder, (err: Error, files: string[]) => {
            if (err) return LogHelper.write(err.message, chalk.red);

            files.forEach((file: string) => {
                if (fileType === file) {
                    /* istanbul ignore next */
                    return file;
                }
            });
        });

        // Return default as JS file
        return `${fileType}.js`;
    }
}
