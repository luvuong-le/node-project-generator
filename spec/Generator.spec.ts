import { PromptResult } from './../source/Types/PromptResult';
import Generator, { generatorPrompt } from './__mocks__/generator';

jest.mock('./__mocks__/generator');

describe('Generator - Test User Input', () => {
    beforeAll(
        (): void => {
            // Clear all instances and calls to constructor and all methods
            Generator.mockClear();
            generatorPrompt.mockClear();
        }
    );

    it('should equal express server', async (): Promise<void> => {
        const res: PromptResult = await generatorPrompt();

        expect(res.option).toEqual('express-server');
        expect(generatorPrompt).toHaveBeenCalledTimes(1);
    });
});
