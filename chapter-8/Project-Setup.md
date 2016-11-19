Test Project Setup
==================
Here's how to create the `speakers-hal-test` project with Node.


## Contents
- [Create the Project Directory](#create-the-project-directory)
- [Create the Project with `npm init`](#create-the-project-with-npm-init)
- [Install Node Modules](#install-node-modules)
- [Create Test Directory](#create-test-directory)
- [Write the Tests](#write-the-tests)
- [Start the Test Server](#start-the-test-server)
- [Run the Tests](#run-the-tests)


## Create the Project Directory
First, find a suitable directory for your projects.
`cd ~/projects`

Next, create the `speakers-hal-test` directory and navigate there:
```
mkdir speakers-hal-test

cd speakers-hal-test
```

## Create the Project with `npm init`
Now, use `npm init` to create your Node project.

Your CLI session should look like this:
```
npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (speakers-hal-test)
version: (1.0.0)
description: Unit Tests for speakers API with HAL.
entry point: (index.js)
test command: mocha test
git repository: ...
keywords: JSON, HAL, Mocha, Chai
author: Me
license: (ISC) MIT
About to write to /Users/tmarrs/projects/json-at-work-examples/chapter-8/speakers-hal-test/package.json:

{
  "name": "speakers-hal-test",
  "version": "1.0.0",
  "description": "Unit Tests for speakers API with HAL.",
  "main": "index.js",
  "scripts": {
    "test": "mocha test"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/tmarrs/json-at-work-examples"
  },
  "keywords": [
    "JSON",
    "HAL",
    "Mocha",
    "Chai"
  ],
  "author": "Me",
  "license": "MIT"
  ...
}


Is this ok? (yes)
```

## Install Node Modules
Next, install the modules we'll need:
```
npm install mocha --save-dev
npm install chai --save-dev
npm install unirest --save-dev
npm install hal-body --save-dev
```

## Create Test Directory
Create the test directory and navigate there.
```
mkdir test

cd test
```

## Write the Tests
Now you're ready to start writing tests in the `test` directory.


## Start the Test Server
Don't forget to run the test server.
```
cd ../data

json-server -p 5000 ./speakers-hal-server-next-rel.json
```


## Run the Tests
Create another terminal session and run the tests as follows:
```
cd ~/projects/json-at-work-examples/chapter-8/speakers-hal-test

npm test
```