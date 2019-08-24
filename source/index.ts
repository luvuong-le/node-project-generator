#!/usr/bin/env node

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
    .usage('Usage: gen <command> [Options]')
    .scriptName('')
    .commandDir('./Commands', {
        extensions:
            process.env.NODE_ENV === 'development' ? ['js', 'ts'] : ['js']
    })
    .example(
        'Gen new project ExpressProject --name express',
        'Run generator to generate a express project'
    )
    .example(
        'Generate new code Controller --name TestController',
        'Run generator to generate test controller file'
    )
    .example('gen list', 'List a tree of all possible generation options')
    .options({
        help: {
            alias: 'h',
            describe: 'Get the help screen'
        },
        version: {
            alias: 'v',
            describe: 'Show version number'
        },
        name: {
            alias: 'n',
            describe: 'Name of project/code file'
        },
        path: {
            alias: 'p',
            describe: 'Path to generate the files',
            default: '.'
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
