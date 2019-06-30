import { Question } from './../Types/Question';

export const questions = (projects: string[]): Question[] => {
    return [
        {
            name: 'project-choice',
            type: 'list',
            message: 'What project would you like to generate?',
            choices: projects
        }
    ];
};
