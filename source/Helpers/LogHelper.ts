import { Chalk } from 'chalk';

export default abstract class LogHelper {
    /**
     * Console log a message with the inclusion of color choice from chalk
     * @param  {string} message
     * @param  {Chalk} color
     * @returns {void}
     */
    public static write(message: string, color: Chalk): void {
        return console.log(color(message));
    }
}
