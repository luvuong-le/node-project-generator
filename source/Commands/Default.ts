import { Argv } from 'yargs';
import Generator from '../Core/Generator';

export const command: string = '$0';

export const describe: string = 'Default Command';

export const builder: object = {};

export const handler = (argv: Argv) => {
    Generator.run();
    console.log('This is the default command');
};
