import { Argv } from 'yargs';

export const command: string = 'new <generatorType> <type>';

export const aliases: string[] = ['g'];

export const describe: string = 'Generate a new project';

export const builder: object = {};

export const handler = (argv: Argv) => {};
