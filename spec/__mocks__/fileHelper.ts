import fs from 'fs';

export const FileHelperMock: jest.Mock = jest.fn().mockResolvedValue({
    replaceStringInFile: (
        text: string,
        regex: RegExp,
        data: string,
        fileLocation: string
    ) => {
        const result = data.replace(regex, text);

        fs.writeFileSync(fileLocation, result, 'utf8');
    }
});

export default FileHelperMock;
