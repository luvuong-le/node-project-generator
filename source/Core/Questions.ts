import { QuestionContainer } from '@modules/Types/QuestionContainer';
import { Question } from '@modules/Types/Question';
import Utility from '@modules/Core/GeneratorUtility';
import Options from '@modules/Enums/Options';
import Projects from '@modules/Enums/Projects';
import Code from '@modules/Enums/Code';
import LogHelper from '@modules/Helpers/LogHelper';

import chalk from 'chalk';

export const OptionQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'Choose what you would like to generate',
        choices: Utility.getChoices(Options)
    }
];

export const ProjectQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'What project would you like to generate?',
        choices: Utility.getChoices(Projects)
    },
    {
        name: 'projectName',
        type: 'input',
        message: 'Name of project',
        validate: (input: String) => {
            if (input === '') {
                LogHelper.write(
                    '\n[Error] Please enter a project name',
                    chalk.red
                );
                return false;
            }
            return true;
        }
    },
    {
        name: 'projectGeneratePath',
        type: 'input',
        message:
            'Enter a folder or path to generate [Leave blank for root directory]'
    },
    {
        name: 'customTemplatePath',
        type: 'input',
        message:
            'Enter a custom path to your templates folder [Leave blank for default in root folder]'
    },
    {
        name: 'gitInit',
        type: 'confirm',
        message: 'Initialize a git repo? (Git must be installed!)'
    },
    {
        name: 'npmInstall',
        type: 'confirm',
        message: 'Run npm install?'
    },
    {
        name: 'generate',
        type: 'confirm',
        message: 'Confirm generation of template'
    }
];

export const CodeQuestions: Question[] = [
    {
        name: 'option',
        type: 'list',
        message: 'What would you like to generate?',
        choices: Utility.getChoices(Code)
    },
    {
        name: 'fileName',
        type: 'input',
        message: 'Filename',
        validate: (input: String) => {
            if (input === '') {
                console.log(chalk.red('\n[Error] Please enter a filename'));
                return false;
            }
            return true;
        }
    },
    {
        name: 'codeGeneratePath',
        type: 'input',
        message:
            'Enter a folder or path to generate [Leave blank for root directory]'
    },
    {
        name: 'customTemplatePath',
        type: 'input',
        message:
            'Enter a custom path to your templates folder [Leave blank for default in root folder]'
    },
    {
        name: 'generate',
        type: 'confirm',
        message: 'Confirm generation of template'
    }
];

// Main Container of Questions
export const CombineQuestions = (): QuestionContainer => {
    return {
        Options: OptionQuestions,
        Projects: ProjectQuestions,
        Code: CodeQuestions
    };
};
