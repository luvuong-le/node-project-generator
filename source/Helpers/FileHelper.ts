import {
    CodeFileDetails,
    ProjectFileDetails
} from '@modules/Types/FileDetails';
import { PromptResult } from '@modules/Types/PromptResult';
import StringHelper from './StringHelper';
import fs from 'fs-extra';
import path from 'path';
import Options from '@modules/Enums/Options';
import chalk from 'chalk';

export default class FileHelper {
    static generateFile(
        fileDetails: CodeFileDetails,
        actions: PromptResult
    ): void {
        fs.copyFile(
            fileDetails.pathToFile,
            fileDetails.newFileLocation,
            (err: Error) => {
                if (err) return console.log(err);
                console.log(
                    chalk.green(
                        `\nSuccessfully copied ${fileDetails.fileName} to ${
                            fileDetails.newFileLocation
                        }`
                    )
                );

                // Replace file contents depending on filetype
                fs.readFile(
                    fileDetails.newFileLocation,
                    'utf8',
                    (err: Error, data: string) => {
                        if (err) return console.log(err);

                        if (actions.fileName) {
                            FileHelper.replaceStringInFile(
                                StringHelper.uppercaseCamelCase(
                                    actions.fileName
                                ),
                                /{ControllerName}/i,
                                data,
                                fileDetails.newFileLocation
                            );
                        }

                        console.log(
                            chalk.green(
                                `\nSuccessfully generated ${
                                    fileDetails.fileType
                                }`
                            )
                        );
                    }
                );
            }
        );
    }

    /**
     * @param  {PromptResult} actions
     * @param  {Options} type
     * @returns CodeFileDetails
     */
    static getFileDetails(
        actions: PromptResult,
        type: Options
    ): CodeFileDetails {
        const fileType: string = actions.option;
        const fileName: string = FileHelper.getFileName(type, fileType);
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
     * @param  {PromptResult} actions
     * @param  {Options} type
     * @returns ProjectFileDetails
     */
    static getProjectDetails(
        actions: PromptResult,
        type: Options
    ): ProjectFileDetails {
        const currentDirectory: string = process.cwd();
        const newDirectory: string = `${currentDirectory}/${
            actions.projectName
        }`;

        const directoryToCopy: string = path.resolve(
            __dirname,
            '../../templates',
            type.toLowerCase(),
            actions.option.toLowerCase()
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

        // Return default as JS file
        return `${fileType}.js`;
    }
}
