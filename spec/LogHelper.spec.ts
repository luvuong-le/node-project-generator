import Code from '../source/Enums/Code';
import Options from '../source/Enums/Options';
import LogHelper from '../source/Helpers/LogHelper';
import chalk from 'chalk';

// Test properly for console logs

describe('Log Helper Tests', () => {
    it('should log something out and return undefined', async () => {
        expect(LogHelper.write('Test Log', chalk.blue)).toEqual(undefined);
    });

    it('should return a list of options and return undefined', () => {
        expect(LogHelper.listOptions(Options.Code, Code, chalk.blue)).toEqual(
            undefined
        );
    });
});
