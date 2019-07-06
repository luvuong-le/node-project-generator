import { PromptResult } from './../Types/PromptResult';
import path from 'path';

export class Utility {
    static getChoices(type: any): string[] {
        const choices: string[] = [];

        for (let choice in type) {
            choices.push(type[choice]);
        }

        return choices;
    }

    /**
     * @param  {PromptResult} action
     * @param  {string} type
     */
    static create(action: PromptResult, type: string) {
        // Copy from template folder depending on the type and prompt result
        const currentDirectory = __dirname;
        const templateDirectory = path.resolve(__dirname, '../../templates');

        const directoryToCopy = path.resolve(
            __dirname,
            '../../templates',
            type.toLowerCase(),
            action.option.toLowerCase()
        );

        console.log(currentDirectory);
        console.log(templateDirectory);
        console.log(directoryToCopy);

        // Perform the copy
    }
}
