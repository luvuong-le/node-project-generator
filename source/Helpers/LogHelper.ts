import { Chalk } from 'chalk';
import _ from 'lodash';

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

    public static listOptions(
        optionType: string,
        optionList: any,
        color: Chalk
    ): void {
        this.write(
            `\nListing all type of ${_.capitalize(optionType.toString())}: `,
            color.blue
        );
        for (let option in optionList) {
            LogHelper.write(`    -${_.capitalize(option)}`, color.blue);
        }
    }
}
