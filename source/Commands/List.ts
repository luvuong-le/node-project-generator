import { Argv } from 'yargs';

export const command: string = 'list';

export const aliases: string[] = ['l'];

export const describe: string = 'List all available projects';

export const builder: object = {};

export const handler = (argv: Argv) => console.log(argv);
