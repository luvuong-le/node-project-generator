export type CommandPromptResult = {
    command: string;
    generatorType: string;
    specifiedToGenerate: string;

    // Non Optional Arguments
    name?: string;
    path?: string;
    gitInit?: boolean;
    npmInit?: boolean;
};
