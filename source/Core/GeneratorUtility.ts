import {
    CodeFileDetails,
    ProjectFileDetails
} from '@modules/Types/FileDetails';
import { PromptResult } from '@modules/Types/PromptResult';
import Options from '@modules/Enums/Options';
import FileHelper from '@modules/Helpers/FileHelper';
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
     * @returns {boolean}
     */
    static generateCode(
        promptResult: PromptResult,
        generatorType: Options
    ): Promise<boolean> {
        if (promptResult.generate) {
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
            return FileHelper.generateFile(fileDetails, promptResult);
        }

        return new Promise((resolve, reject) => {
            reject(false);
        });
    }

    /**
     * @param  {PromptResult} promptResult
     * @param  {Options} generatorType
     * @returns {boolean}
     */
    static generateProject(
        promptResult: PromptResult,
        generatorType: Options
    ): Promise<boolean> {
        if (promptResult.generate) {
            // Copy from template folder depending on the type and prompt result
            const projectDetails: ProjectFileDetails = FileHelper.getProjectDetails(
                promptResult,
                generatorType
            );

            // Create the new directory
            fs.mkdirSync(projectDetails.newDirectory);

            // Run the generation of the project
            return FileHelper.generateProject(promptResult, projectDetails);
        }
        return new Promise((resolve, reject) => {
            reject(false);
        });
    }
}
