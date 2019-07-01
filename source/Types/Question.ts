export type Question = {
    name: string;
    type: string;
    message: string;
    choices: string[];
};

export type QuestionContainer = {
    Options: Question[];
    Projects: Question[];
};
