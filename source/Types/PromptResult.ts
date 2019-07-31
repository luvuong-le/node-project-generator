export type PromptResult = {
    option: string;
    generate: string;

    // Project Configurations
    projectName?: string;
    npmInstall?: string;
    gitInit?: string;

    // Code Configurations
    fileName?: string;
    codeGeneratePath?: string;
};
