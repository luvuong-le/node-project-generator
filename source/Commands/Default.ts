import { Argv } from 'yargs';
import { generator } from '../Core/Generator';

export const command: string = '$0';

export const describe: string = 'Default Command';

export const builder: object = {};

export const handler = (argv: Argv) => generator.run();
