import { PromptResult } from './../Types/PromptResult';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';

export class Utility {
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
     * @param  {PromptResult} action
     * @param  {string} type
     * @returns void
     */
    static generateCode(action: PromptResult, type: string): void {}

    /**
     * @param  {PromptResult} action
     * @param  {string} type
     */
    static generateProject(
        action: PromptResult,
        type: string,
        projectName: PromptResult
    ): void {
        // Copy from template folder depending on the type and prompt result
        const currentDirectory: string = process.cwd();
        const newDirectory: string = `${currentDirectory}/${
            projectName.option
        }`;

        // Create the new directory
        fs.mkdirSync(newDirectory);

        const directoryToCopy: string = path.resolve(
            __dirname,
            '../../templates',
            type.toLowerCase(),
            action.option.toLowerCase()
        );

        // Perform the copy
        fs.copy(directoryToCopy, newDirectory, (err: any) => {
            if (err) {
                console.log('Error: Could not perform copy', err);
            }
            console.log(
                chalk.green('\n[Success]: Successfully generated project')
            );
        });

        // Change Directory and install npm
        shell.cd(newDirectory);

        const spinner = ora('Running Package Install...\n').start();

        shell.exec(
            'npm install',
            (code: number, stdout: string, stderr: string) => {
                console.log('Exit code:', code);
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);

                spinner.stop();

                console.log('Package Install Run Successfully');
            }
        );
    }
}
