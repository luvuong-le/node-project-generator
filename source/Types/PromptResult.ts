export type PromptResult = {
    option: string;
    generate: boolean;

    // Project Configurations
    projectName?: string;
    projectGeneratePath?: string;
    gitInit?: boolean;
    npmInstall?: boolean;

    // Code Configurations
    fileName?: string;
    codeGeneratePath?: string;

    customTemplatePath?: string;
};
