import { Question, QuestionContainer } from './../Types/Question';
import { Utility } from './Utility';
import Options from '../Enums/Options';
import Projects from '../Enums/Projects';

// Main Question
export const OptionQuestions: Question[] = [
    {
        name: 'template',
        type: 'list',
        message: 'Choose what you would like to generate',
        choices: Utility.getChoices(Options)
    }
];

// Project Questions
export const ProjectQuestions: Question[] = [
    {
        name: 'project',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: Utility.getChoices(Projects)
    }
];

// Code Questions
export const questions = (): QuestionContainer => {
    return {
        Options: OptionQuestions,
        Projects: ProjectQuestions
    };
};
