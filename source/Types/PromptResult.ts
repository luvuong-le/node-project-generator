export type PromptResult = {
    option: string;
    generate: string;

    // Project Configurations
    projectName?: string;
    npmInstall?: string;

    // Code Configurations
    fileName?: string;
    codeGeneratePath?: string;
};
