import { PromptResult } from '../../source/Types/PromptResult';

export const PromptResultMock: jest.Mock<
    PromptResult
> = jest.fn().mockResolvedValue({
    option: 'react',
    generate: true,
    projectName: 'test',
    npmInstall: true,
    gitInit: true,
    codeGeneratePath: 'testDir',
    projectGeneratePath: 'testDir',
    fileName: 'test'
});

export default PromptResultMock;
