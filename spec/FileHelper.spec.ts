import Options from '../source/Enums/Options';
import { PromptResult } from '../source/Types/PromptResult';
import {
    ProjectFileDetails,
    CodeFileDetails
} from './../source/Types/FileDetails';
import FileHelper from '../source/Helpers/FileHelper';
import FileHelperMock from './__mocks__/fileHelper';
import PromptResultMock from './__mocks__/promptResult';

import path from 'path';
import fs from 'fs-extra';

jest.mock('./__mocks__/promptResult');

describe('File Helper Tests', () => {
    it('should correct filename', async () => {
        expect(FileHelper.getFileName('code', 'Controller')).toEqual(
            'Controller.js'
        );
    });
    it('should return an error for no file found', async () => {
        expect(FileHelper.getFileName('code', 'NotFound')).toEqual(
            'NotFound.js'
        );
    });

    it('should get correct project details', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const projectDetails: ProjectFileDetails = FileHelper.getProjectDetails(
            promptResult,
            Options.Project
        );

        expect(projectDetails).toEqual({
            currentDirectory: process.cwd(),
            directoryToCopy: path.resolve(
                __dirname,
                '../templates',
                Options.Project.toLowerCase(),
                promptResult.option.toLowerCase()
            ),
            newDirectory: `${process.cwd()}/${promptResult.projectName}`
        });
    });

    it('should get the correct file details', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const fileName = FileHelper.getFileName(
            Options.Code,
            promptResult.option
        );

        const fileDetails: CodeFileDetails = FileHelper.getFileDetails(
            promptResult,
            Options.Code
        );

        const pathToFile: string = path.resolve(
            __dirname,
            '../templates',
            Options.Code.toLowerCase(),
            fileName
        );

        expect(fileDetails).toEqual({
            fileType: promptResult.option,
            fileName,
            currentDirectory: process.cwd(),
            pathToFile,
            newFileLocation: path.resolve(
                process.cwd(),
                promptResult.codeGeneratePath || '',
                `${promptResult.fileName}${path.extname(pathToFile)}` || ''
            ),
            codeFolderToGenerate: path.resolve(
                process.cwd(),
                promptResult.codeGeneratePath || ''
            )
        });
    });

    it('should replace string in a dummy text', async () => {
        const fileLocation: string = __dirname + '/dummy.txt';

        // Readfile and replace text
        const initialData: string = fs.readFileSync(fileLocation, 'utf8');

        const FileHelper: any = await FileHelperMock();

        FileHelper.replaceStringInFile(
            'replaced',
            /replace/i,
            initialData,
            fileLocation
        );

        const modifiedData: string = fs.readFileSync(fileLocation, 'utf8');

        expect(modifiedData).toContain('replaced');

        FileHelper.replaceStringInFile(
            'replace',
            /replaced/i,
            modifiedData,
            fileLocation
        );
    });
});
