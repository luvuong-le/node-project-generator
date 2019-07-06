import 'module-alias/register';
import Generator from '@modules/Core/Generator';
import yargs from 'yargs';
import dotenv from 'dotenv';

dotenv.config();
Generator.Configure();

/**
 * Parse Options command line
 */
yargs
    .usage('Usage: generate <command> [Project Name]')
    .scriptName('')
    .commandDir('./Commands', {
        extensions:
            process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js']
    })
    .example('run', 'Run commands automatically from prompt')
    .example('run -p', 'Run commands from prompt')
    .example('run -f src/commands.txt', 'Run instructions from a txt file')
    .options({
        help: {
            alias: 'h',
            describe: 'Get the help screen'
        },
        version: {
            alias: 'v',
            describe: 'Show version number'
        }
    })
    .help().argv;
