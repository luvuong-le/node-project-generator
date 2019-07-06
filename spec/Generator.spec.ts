import Generator, { generatorPrompt } from './__mocks__/generator';

jest.mock('./__mocks__/Generator');

describe('Generator - Test User Input', () => {
    beforeAll(() => {
        // Clear all instances and calls to constructor and all methods
        Generator.mockClear();
        generatorPrompt.mockClear();
    });

    it('should equal express server', async () => {
        const res: any = await generatorPrompt();

        expect(res.project).toEqual('express-server');
        expect(generatorPrompt).toHaveBeenCalledTimes(1);
    });
});
