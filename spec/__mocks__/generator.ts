export const generatorPrompt = jest
    .fn()
    .mockResolvedValue({ project: 'express-server' });

const generatorMock = jest.fn().mockImplementation(() => {
    return {
        prompt: generatorPrompt
    };
});

export default generatorMock;
