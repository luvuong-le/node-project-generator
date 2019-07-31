import chalk, { Chalk } from 'chalk';

export default class LogHelper {
    static write(message: string, color: Chalk) {
        console.log(color(message));
    }
}
