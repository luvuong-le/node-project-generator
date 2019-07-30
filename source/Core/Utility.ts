import { PromptResult } from '@modules/Types/PromptResult';
import ShellCommands from '@modules/Enums/ShellCommands';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import lodash from 'lodash';
import Options from '@modules/Enums/Options';

export default class Utility {
    static replaceFileContents(): void {}

    /**
     * @param  {any} type
     * @returns string[]
     */
    static getChoices(type: any): string[] {
        const choices: string[] = [];

        for (let choice in type) {
            choices.push(type[choice]);
        }

        return choices;
    }

    /**
     * @param  {PromptResult} actions
     * @param  {Options} type
     * @returns void
     */
    static generateCode(actions: PromptResult, type: Options): void {
        const fileType: string = actions.option;
        const fileName: string = this.getFileName(type, fileType);
        const currentDirectory: string = process.cwd();
        const pathToFile: string = path.resolve(
            __dirname,
            '../../templates',
            type.toLowerCase(),
            fileName
        );

        const newFileLocation: string = path.resolve(
            currentDirectory,
            actions.codeGeneratePath || '',
            `${actions.fileName}${path.extname(pathToFile)}` || ''
        );

        const codeFolderToGenerate: string = path.resolve(
            currentDirectory,
            actions.codeGeneratePath || ''
        );

        // Generate custom folder if there is none
        if (actions.codeGeneratePath) {
            if (!fs.existsSync(codeFolderToGenerate)) {
                fs.mkdirSync(codeFolderToGenerate);
            }
        }

        fs.copyFile(pathToFile, newFileLocation, (err: Error) => {
            if (err) return console.log(err);
            console.log(
                chalk.green(
                    `\nSuccessfully copied ${fileName} to ${newFileLocation}`
                )
            );

            // Replace file contents depending on filetype
            fs.readFile(newFileLocation, 'utf8', (err: Error, data: string) => {
                if (err) return console.log(err);

                if (actions.fileName) {
                    this.replaceStringInFile(
                        this.uppercaseCamelCase(actions.fileName),
                        /{ControllerName}/i,
                        data,
                        newFileLocation
                    );
                }

                console.log(
                    chalk.green(`\nSuccessfully generated ${fileType}`)
                );
            });
        });
    }

    /**
     * @param  {string} text
     * @returns string
     */
    static uppercaseCamelCase(text: string): string {
        let camelCaseText: string = lodash.camelCase(text);
        return `${camelCaseText[0].toUpperCase()}${camelCaseText.slice(1)}`;
    }

    /**
     * @param  {string} text
     * @param  {RegExp} regex
     * @param  {string} data
     * @param  {string} fileLocation
     * @returns void
     */
    static replaceStringInFile(
        text: string,
        regex: RegExp,
        data: string,
        fileLocation: string
    ): void {
        let result: string = data.replace(regex, text);

        fs.writeFile(fileLocation, result, 'utf8', (err: Error) => {
            if (err) return console.log(err);
        });
    }
    /**
     * @param  {string} type
     * @param  {string} fileType
     * @returns string
     */
    static getFileName(type: string, fileType: string): string {
        const folder: string = path.resolve(
            __dirname,
            '../../templates',
            type.toLowerCase()
        );

        fs.readdir(folder, (err: Error, files: string[]) => {
            if (err) return;

            files.forEach(file => {
                if (path.basename(file) === fileType) {
                    return file;
                }
            });
        });

        return `${fileType}.js`;
    }

    /**
     * @param  {PromptResult} actions
     * @param  {Options} type
     * @returns void
     */
    static generateProject(actions: PromptResult, type: Options): void {
        if (actions.generate) {
            // Copy from template folder depending on the type and prompt result
            const currentDirectory: string = process.cwd();
            const newDirectory: string = `${currentDirectory}/${
                actions.projectName
            }`;

            // Create the new directory
            fs.mkdirSync(newDirectory);

            const directoryToCopy: string = path.resolve(
                __dirname,
                '../../templates',
                type.toLowerCase(),
                actions.option.toLowerCase()
            );

            // Perform the copy
            fs.copy(directoryToCopy, newDirectory, (err: any) => {
                if (err) {
                    console.log('\n[Error]: Could not perform copy', err);
                }
                console.log(
                    chalk.green('\n[Success]: Successfully generated project')
                );
            });

            if (actions.npmInstall) {
                // Change Directory and install npm
                shell.cd(newDirectory);

                const spinner: ora.Ora = ora(
                    'Running Package Install...\n'
                ).start();

                shell.exec(
                    ShellCommands.NPM_INSTALL,
                    (code: number, stdout: string, stderr: string) => {
                        console.log('Exit code:', code);
                        console.log('Program output:', stdout);
                        console.log('Program stderr:', stderr);

                        spinner.stop();

                        console.log('Package Install Run Successfully');
                    }
                );
            } else {
                console.log(chalk.blue('[Info]: Not Running NPM Install'));
            }
        }
        console.log(chalk.blue('\n[Info]: Exiting generator'));
    }
}
