import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { Question } from '@modules/Types/Question';
import { Utility } from '@modules/Core/Utility';
import Options from '@modules/Enums/Options';
import Projects from '@modules/Enums/Projects';
import Code from '@modules/Enums/Code';

// Main Question
export const OptionQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'Choose what you would like to generate',
        choices: Utility.getChoices(Options)
    }
];

// Project Questions
export const ProjectQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: Utility.getChoices(Projects)
    }
];

// Code Questions
export const CodeQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'What would you like to generate?',
        choices: Utility.getChoices(Code)
    }
];

// Main Container of Questions
export const questions = (): QuestionContainer => {
    return {
        Options: OptionQuestions,
        Projects: ProjectQuestions,
        Code: CodeQuestions
    };
};
