import { Argv } from 'yargs';

export const command: string = 'list <generatorType>';

export const aliases: string[] = ['ls'];

export const describe: string = 'List all available projects';

export const builder: object = {};

export const handler = (argv: Argv) => {};
