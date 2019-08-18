import { Argv } from 'yargs';

export const command: string = 'new <generatorType> <type>';

export const aliases: string[] = ['g'];

export const describe: string = 'Generate a new project';

export const builder: object = {};

export const handler = (argv: Argv) => {};

// Example Command:
// Generate new project express -name ExpressProject -path ./express/test -ni -ginit
// Generate new code Controller -name TestController -path ./test/
// Generate -g project -t express -name ExpressProject -path ./express/test -ni -ginit
// Generate -g code -t Controller -name TestController -path ./test/
// Generate -> Will launch the user input prompt
