import { Argv } from 'yargs';

export const command: string = 'list <generatorType>';

export const aliases: string[] = ['ls'];

export const describe: string = 'List all available projects or code files';

export const builder: object = {};

export const handler = (argv: Argv) => {};
