import { PromptResult } from '@modules/Types/PromptResult';
import ShellCommands from '@modules/Enums/ShellCommands';
import path from 'path';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import Options from '@modules/Enums/Options';

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
     * @param  {Options} type
     * @param  {ConfigResult} config
     * @returns void
     */
    static generateCode(actions: PromptResult, type: Options): void {
        // TODO: Copy from template depending on type
        // TODO: Copy to new location
    }

    /**
        actions: PromptResult,
     * @param  {PromptResult} action
     * @param  {Options} type
     * @param  {ConfigResult} config
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
                    console.log('Error: Could not perform copy', err);
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
