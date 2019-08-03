import LogHelper from '../source/Helpers/LogHelper';
import chalk from 'chalk';

// Test properly for console logs

describe('Log Helper Tests', () => {
    it('should log something out and return undefined', async () => {
        expect(LogHelper.write('Test Log', chalk.blue)).toEqual(undefined);
    });
});
