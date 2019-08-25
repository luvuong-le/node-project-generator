# 🔧 Node Project/Code Generator

**Important Notes:** This generator is far from perfect and can most definitely be improved. This is intended for convenient personal use and was mainly designed for an keen interest in trying to develop my own implementation.

Although this demonstrates how you may create a generator yourself 😄

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Content

- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Options](#options)
- [Example Commands](#example-commands)
- [Contribute](#contribute)

## Demo

Below is an example of the generator in action

![Node Project Generator Example Demo](/assets/node-project-generator.gif)

## Tech Stack

| Technology | Description                                                                           | Link ↘️                 |
| ---------- | ------------------------------------------------------------------------------------- | ----------------------- |
| JavaScript | High Level, Dynamic, Interpreted Language                                                                                      | https://webpack.js.org/ |
| NodeJS     | Open Source, Javascript Run Time Environment, Execute Javascript code for server side | https://nodejs.org/en/  |
| Typescript     |  Open-source programming language developed and maintained by Microsoft | https://www.typescriptlang.org/ |
| Jest       | Javascript Testing Framework                                                          | https://jestjs.io/      |

## Features

- Ability to generate either a project or code file with various options
- Able to use CLI mode or User Input Mode
- Easily able to add new templates and options/questions to the generator
- List all projects
- List all code files
- Add new prompts for user input mode
- Generate project with **NPM Package Installation** and **Git Init**

## Installation

### Running the generator

_Ensure [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed_

1. Clone or Download the repository (Depending on whether you are using SSH or HTTPS)

    Example below shows using SSH:

    ```bash
    $ git clone git@github.com:luvuong-le/node-project-generator.git
    $ cd node-project-generator
    ```

2. Install dependencies using **_npm install_**

3. Build the project using **_npm run build_**

4. Symlink the project using **_npm link_**
   > For more information on npm link view here [npm link](https://docs.npmjs.com/cli/link)

5. Once the link is successful, open up a terminal and you should be able to run:

```bash
gen -h 
generate -h
```

## Options

| Option | Description                                                                           |
| ---------- | ------------------------------------------------------------------------------------- |
| --help, -h | Show help menu |
| --version, -v | Display version number |
| --name, -n | Specify name of generated file or project **[Optional]** |
| --path, -p | Specify path of file or project **[Optional]** |
| --templatePath, --tp | Specify path of custom template folder **[Optional]** |
| --npmInit, --ni | Specify to run project generation with npm install **[Optional]** |
| --gitInit, --ginit | Specify to run project generation with git init **[Optional]**|

**Notes:**

- Custom template path must have the correct specific structure based on the Enums. An example of this is below:
    - templateFolderName
        - code
            - Router.js (One level only)
        - project
            - express

## Example Commands

```bash
gen -h
generate new project express --name ExpressProject -p express/test --ni --ginit
generate new code controller --name TestController -p ./test/
generate new code route --name TestController -p ./test/ --tp 'custom path'
gen list code
gen list all
```

## Running Tests

Tests should be run before every commit to ensure the build is not broken by any code changes.

Running the tests:

```javascript
In the root directory
$ npm run test
```

## Contribute

Built as a personal project for learning experience and fun. Please feel free to contribute by creating issues, submitting new pull requests!
