import { Question } from '@modules/Types/Question';

export type QuestionContainer = {
    Options: Question[];
    Projects: Question[];
    Code: Question[];
    ProjectName: Question[];
};
