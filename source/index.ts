import 'module-alias/register';
import Generator from '@modules/Core/Generator';
import yargs from 'yargs';
import dotenv from 'dotenv';

dotenv.config();
Generator.Configure();

/**
 * Parse Options command line
 */
const argv: any = yargs
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
            describe: 'Generate code or a project'
        },
        type: {
            alias: 't',
            describe: 'Describe what type of project or code file to generate'
        },
        projectName: {
            alias: 'name',
            describe: 'Name of project/code file'
        },
        path: {
            alias: 'p',
            describe: 'Path to generate the files'
        },
        npmInit: {
            alias: 'ni',
            describe: 'Perform a npm install in the current directory'
        },
        gitInit: {
            alias: 'ginit',
            describe: 'Perform a git init on project'
        }
    }).argv;

console.log(argv._);

/** Parse Command Line Arguments to determine how to run the generation */
if (argv._.length !== 0 && !argv._.includes('start')) {
    Generator.Instance().runViaCommand({
        command: argv._,
        generatorType: argv.generatorType,
        specifiedToGenerate: argv.type,
        name: argv.name,
        path: argv.path,
        gitInit: argv.gitInit,
        npmInit: argv.npmInit
    });
} else {
    Generator.Instance().run();
}
