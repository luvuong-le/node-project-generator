import { Question } from '@modules/Types/Question';

export type QuestionContainer = {
    Options: Question[];
    Projects: Question[];
    ProjectConfig: Question[];
    Code: Question[];
    CodeConfig: Question[];
};
