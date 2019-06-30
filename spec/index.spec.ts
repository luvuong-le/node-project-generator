import { Argv } from 'yargs';
import yargs from 'yargs';

describe('Index Tests', () => {
    it('returns help output', async () => {
        // Initialize parser using the command module
        const parser = yargs
            .command(require('../source/Commands/Generate'))
            .help();

        // Run the command module with --help as argument
        const output = await new Promise(resolve => {
            parser.parse('--help', (err: any, argv: Argv, output: any) => {
                resolve(output);
            });
        });

        // Verify the output is correct
        expect(output).toContain('Generate a new project');
    });
});
