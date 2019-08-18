export type CodeFileDetails = {
    fileType: string;
    fileName: string;
    currentDirectory: string;
    pathToFile: string;
    newFileLocation: string;
    codeFolderToGenerate: string;
};

export type ProjectFileDetails = {
    currentDirectory: string;
    newDirectory: string;
    directoryToCopy: string;
    projectFolderToGenerate: string;
};
