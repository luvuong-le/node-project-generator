import 'module-alias/register';
import Generator from '@modules/Core/Generator';
import yargs from 'yargs';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Parse Options command line
 */
const argv: yargs.Arguments = yargs
    .usage('Usage: generate <command> [Options]')
    // .scriptName('')
    .commandDir('./Commands', {
        extensions:
            process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js']
    })

    .example(
        '$0 -g project -t react',
        'Run generator to generate a react project'
    )
    .example(
        '$0 -g code -t controller',
        'Run generator to generate controller file'
    )
    .example('$0 -l', 'List a tree of all possible generation options')
    .options({
        help: {
            alias: 'h',
            describe: 'Get the help screen'
        },
        version: {
            alias: 'v',
            describe: 'Show version number'
        },
        generate: {
            alias: 'g',
            describe: 'Generate a file or project'
        },
        type: {
            alias: 't',
            describe: 'Describe file or project to generate'
        }
    }).argv;

Generator.Configure(argv);
