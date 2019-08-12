import { Chalk } from 'chalk';

export default abstract class LogHelper {
    /**
     * @param  {string} message
     * @param  {Chalk} color
     * @returns {void}
     */
    public static write(message: string, color: Chalk): void {
        return console.log(color(message));
    }
}
