export type CommandPromptResult = {
    command: string;
    generatorType: string;
    specifiedToGenerate: string;

    // Non Optional Arguments
    name?: string;
    path?: string;
    templatePath?: string;
    gitInit?: boolean;
    npmInit?: boolean;
};
