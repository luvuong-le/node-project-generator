import { CodeFileDetails, ProjectFileDetails } from './../Types/FileDetails';
import { PromptResult } from '@modules/Types/PromptResult';
import ShellCommands from '@modules/Enums/ShellCommands';
import Options from '@modules/Enums/Options';
import FileHelper from '@modules/Helpers/FileHelper';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import LogHelper from '@modules/Helpers/LogHelper';

export default class Utility {
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
        const fileDetails: CodeFileDetails = FileHelper.getFileDetails(
            actions,
            type
        );

        // Generate custom folder if there is none
        if (actions.codeGeneratePath) {
            if (!fs.existsSync(fileDetails.codeFolderToGenerate)) {
                fs.mkdirSync(fileDetails.codeFolderToGenerate);
            }
        }

        // Generate the file
        FileHelper.generateFile(fileDetails, actions);
    }

    /**
     * @param  {PromptResult} actions
     * @param  {Options} type
     * @returns void
     */
    static generateProject(actions: PromptResult, type: Options): void {
        if (actions.generate) {
            // Copy from template folder depending on the type and prompt result
            const projectDetails: ProjectFileDetails = FileHelper.getProjectDetails(
                actions,
                type
            );

            // Create the new directory
            fs.mkdirSync(projectDetails.newDirectory);

            // Perform the copy
            fs.copy(
                projectDetails.directoryToCopy,
                projectDetails.newDirectory,
                (err: any) => {
                    if (err) {
                        console.log('\n[Error]: Could not perform copy', err);
                    }
                    console.log(
                        chalk.green(
                            '\n[Success]: Successfully generated project'
                        )
                    );
                }
            );

            // Perform Further actions
            if (actions.gitInit) {
                shell.exec(
                    ShellCommands.GIT_INIT,
                    (code: number, stdout: string, stderr: string) => {
                        if (stderr) return console.log(stderr);

                        console.log(stdout);
                        console.log('Git Repo Initialized');
                    }
                );
            }

            if (actions.npmInstall) {
                // Change Directory and install npm
                shell.cd(projectDetails.newDirectory);

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
        LogHelper.write('\n[Info]: Exiting generator', chalk.blue);
    }
}
