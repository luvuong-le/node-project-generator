import {
    CodeFileDetails,
    ProjectFileDetails
} from '@modules/Types/FileDetails';
import { PromptResult } from '@modules/Types/PromptResult';
import Options from '@modules/Enums/Options';
import LogHelper from '@modules/Helpers/LogHelper';
import FileHelper from '@modules/Helpers/FileHelper';

import chalk from 'chalk';
import fs from 'fs-extra';

export default class GeneratorUtility {
    private constructor() {}

    /**
     * @param  {any} generatorType
     * @returns {string[]}
     */
    static getChoices(generatorType: any): string[] {
        const options: string[] = [];

        for (let option in generatorType) {
            options.push(generatorType[option]);
        }

        return options;
    }

    /**
     * @param  {PromptResult} promptResults
     * @param  {Options} generatorType
     * @returns {void}
     */
    static generateCode(
        promptResult: PromptResult,
        generatorType: Options
    ): void {
        const fileDetails: CodeFileDetails = FileHelper.getFileDetails(
            promptResult,
            generatorType
        );

        // Generate custom folder if there is none
        if (promptResult.codeGeneratePath) {
            if (!fs.existsSync(fileDetails.codeFolderToGenerate)) {
                fs.mkdirSync(fileDetails.codeFolderToGenerate);
            }
        }

        // Generate the file
        FileHelper.generateFile(fileDetails, promptResult);
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {void}
     */
    static generateProject(
        promptResult: PromptResult,
        generatorType: Options
    ): void {
        if (promptResult.generate) {
            // Copy from template folder depending on the type and prompt result
            const projectDetails: ProjectFileDetails = FileHelper.getProjectDetails(
                promptResult,
                generatorType
            );

            // Create the new directory
            fs.mkdirSync(projectDetails.newDirectory);

            // Run the generation of the project
            FileHelper.generateProject(promptResult, projectDetails);
        }
        LogHelper.write('\n[Info]: Exiting generator', chalk.blue);
    }
}
