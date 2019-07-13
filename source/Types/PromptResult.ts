export type PromptResult = {
    option: String;
    generate: String;

    // Project Configurations
    projectName?: String;
    npmInstall?: String;

    // Code Configurations
    fileName?: String;
    codeGeneratePath?: String;
};
