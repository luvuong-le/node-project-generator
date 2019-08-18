import { PromptResult } from '../../source/Types/PromptResult';

export const PromptResultMock: jest.Mock<
    PromptResult
> = jest.fn().mockResolvedValue({
    option: 'react',
    generate: 'y',
    projectName: 'test',
    npmInstall: 'y',
    gitInit: 'y',
    codeGeneratePath: 'testDir',
    projectGeneratePath: 'testDir',
    fileName: 'test'
});

export default PromptResultMock;
