import Options from '../source/Enums/Options';
import { PromptResult } from '../source/Types/PromptResult';
import {
    ProjectFileDetails,
    CodeFileDetails
} from './../source/Types/FileDetails';
import FileHelper from '../source/Helpers/FileHelper';
import PromptResultMock from './__mocks__/promptResult';

import path from 'path';
import mock from 'mock-fs';
import fs from 'fs-extra';

jest.mock('./__mocks__/promptResult');

beforeEach(() => {
    mock({
        mockdir: {
            'dummy.txt': 'replace text here',
            'dummy.js': 'js file'
        },
        templates: {
            project: {
                express: {
                    'server.js': 'server file',
                    '.gitignore': 'gitignore'
                }
            },
            code: {
                'Controller.js': 'Controller File'
            }
        },
        fake: {
            test: {}
        }
    });
});

describe('File Helper Tests', () => {
    it('should correct filename', async () => {
        expect(
            FileHelper.getFileName('code', 'Controller', 'templates/code')
        ).toEqual('Controller.js');
    });
    it('should return an error for no file found', async () => {
        expect(
            FileHelper.getFileName('code', 'NotFound', 'templates/fakes')
        ).toEqual('NotFound.js');
    });

    it('should generate a file', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const fileDetails: CodeFileDetails = {
            fileType: '',
            fileName: 'test',
            currentDirectory: '',
            pathToFile: 'mockdir/dummy.js',
            newFileLocation: 'mockdir/test.js',
            codeFolderToGenerate: ''
        };

        await FileHelper.generateFile(fileDetails, promptResult);

        const newFileText: string = fs.readFileSync(
            fileDetails.newFileLocation,
            'utf8'
        );

        expect(newFileText).toContain('js');
    });

    it('should generate a file and return false', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const fileDetails: CodeFileDetails = {
            fileType: '',
            fileName: '',
            currentDirectory: '',
            pathToFile: 'mockdir/notexist.js',
            newFileLocation: '',
            codeFolderToGenerate: ''
        };

        const result = await FileHelper.generateFile(fileDetails, promptResult);

        expect(result).toEqual(false);
    });

    it('should generate a project', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const projectDetails: ProjectFileDetails = {
            currentDirectory: process.cwd(),
            newDirectory: `fake/${promptResult.projectName}`,
            directoryToCopy: 'templates/project/express'
        };

        const result = await FileHelper.generateProject(
            promptResult,
            projectDetails
        );

        expect(result).toEqual(true);
    });

    it('should not generate a project with wrong directory', async () => {
        const promptResult: PromptResult = await PromptResultMock();

        const projectDetails: ProjectFileDetails = {
            currentDirectory: process.cwd(),
            newDirectory: '',
            directoryToCopy: ''
        };

        const result = await FileHelper.generateProject(
            promptResult,
            projectDetails
        );

        expect(result).toEqual(false);
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

    it('should return a reject for string replacement', () => {
        const fileLocation: string = 'mockdir/404.txt';

        FileHelper.replaceStringInFile(
            'replaced',
            /replace/i,
            'fake',
            fileLocation
        ).then(
            res => {},
            err => {
                expect(err).toContain('EBADF');
            }
        );
    });

    it('should replace string in a dummy text', async () => {
        const fileLocation: string = 'mockdir/dummy.txt';

        // Readfile and replace text
        const initialData: string = fs.readFileSync(fileLocation, 'utf8');

        await FileHelper.replaceStringInFile(
            'replaced',
            /replace/i,
            initialData,
            fileLocation
        );

        const modifiedData: string = fs.readFileSync(fileLocation, 'utf8');

        expect(modifiedData).toContain('replaced');

        await FileHelper.replaceStringInFile(
            'replace',
            /replaced/i,
            modifiedData,
            fileLocation
        );
    });

    it('should return an error in replacing a string', () => {
        const fileLocation: string = __dirname + '/notfoundDir/notfound.txt';

        expect(
            FileHelper.replaceStringInFile(
                'replaced',
                /replace/i,
                'test',
                fileLocation
            )
        ).rejects.toContain('ENOENT');
    });
});

afterEach(() => {
    mock.restore();
});
