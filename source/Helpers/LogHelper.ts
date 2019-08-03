import { Chalk } from 'chalk';

export default class LogHelper {
    private constructor() {}

    /**
     * @param  {string} message
     * @param  {Chalk} color
     * @returns {void}
     */
    static write(message: string, color: Chalk): void {
        return console.log(color(message));
    }
}
