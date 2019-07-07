export const generatorPrompt: jest.Mock = jest
    .fn()
    .mockResolvedValue({ option: 'express-server' });

const generatorMock: jest.Mock = jest.fn().mockImplementation(() => {
    return {
        prompt: generatorPrompt
    };
});

export default generatorMock;
