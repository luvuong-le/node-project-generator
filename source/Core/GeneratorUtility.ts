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
     * Get the choices from the Options/Project/Code Enumerations
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
     * Performs the generation of the code and returns a result
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
                console.log('generating folder');
                if (!fs.existsSync(fileDetails.codeFolderToGenerate)) {
                    fs.mkdirSync(fileDetails.codeFolderToGenerate, {
                        recursive: true
                    });
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
     * Performs the generation of the project and returns a result
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

            // Generate custom folder if there is none
            if (promptResult.projectGeneratePath) {
                if (!fs.existsSync(projectDetails.newDirectory)) {
                    fs.mkdirSync(projectDetails.newDirectory, {
                        recursive: true
                    });
                }
            }

            // Run the generation of the project
            return FileHelper.generateProject(promptResult, projectDetails);
        }
        return new Promise((resolve, reject) => {
            reject(false);
        });
    }
}
