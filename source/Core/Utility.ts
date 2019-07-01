export class Utility {
    static getChoices(type: any): string[] {
        const choices: string[] = [];

        for (let choice in type) {
            choices.push(type[choice]);
        }

        return choices;
    }
}
