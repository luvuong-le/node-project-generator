export type PromptResult = {
    option: string;
    generate: string;

    // Project Configurations
    projectName?: string;
    projectGeneratePath?: string;
    gitInit?: string;
    npmInstall?: string;

    // Code Configurations
    fileName?: string;
    codeGeneratePath?: string;
};
