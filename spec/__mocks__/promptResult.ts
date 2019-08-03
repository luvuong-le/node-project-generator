import { PromptResult } from '../../source/Types/PromptResult';

export const PromptResultMock: jest.Mock<
    PromptResult
> = jest.fn().mockResolvedValue({
    option: 'react',
    generate: 'y',
    projectName: 'test',
    npmInstall: 'n',
    gitInit: 'n',
    codeGeneratePath: 'testDir'
});

export default PromptResultMock;
