export type Question = {
    name: string;
    type: string;
    message: string;
    validate?: Function;
    choices?: string[];
};
