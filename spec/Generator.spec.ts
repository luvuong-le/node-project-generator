import Generator from './../source/Core/Generator';

jest.mock('./../source/Core/Generator');

describe('Generator - Test User Input', () => {
    const generator = new Generator();

    beforeAll(() => {
        // Mock the prompt function
        generator.prompt = jest
            .fn()
            .mockResolvedValue({ project: 'express-server' });
    });

    it('should equal express server', async () => {
        const res: any = await generator.prompt();

        expect(res.project).toEqual('express-server');
    });
});
