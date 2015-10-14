Test Project Setup
==================
Here's how to create the transform-test project with Node.


## Contents
- [Create the Project Directory](#create-the-project-directory)
- [Create the Project with `npm init`](#create-the-project-with-npm-init)
- [Install Node Modules](#install-node-modules)
- [Create Test Directory](#create-test-directory)
- [Write the Tests](#write-the-tests)
- [Run the Tests](#run-the-tests)


## Create the Project Directory
First, find a suitable directory for your projects.
`cd ~/projects`

Next, create the `transform-test` directory and navigate there:
```
mkdir transform-test

cd transform-test
```

## Create the Project with `npm init`
Now, use `npm init` to create your Node project.

Your CLI session should look like this:
```
npm init

npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (transform-test)
version: (1.0.0)
description: JSON Transform tests.
entry point: (index.js)
test command: mocha test
git repository:
keywords: JSON, Search, Transform
author: Me
license: (ISC)
About to write to /Users/tmarrs/projects/transform-test/package.json:

{
  "name": "transform-test",
  "version": "1.0.0",
  "description": "JSON Transform tests.",
  "main": "index.js",
  "scripts": {
    "test": "mocha test"
  },
  "keywords": [
    "JSON",
    "Transform"
  ],
  "author": "Me",
  "license": "ISC"
}


Is this ok? (yes)
```

## Install Node Modules
Next, install the modules we'll need:
```
npm install mocha --save
npm install chai --save
npm install jsonfile --save
npm install json-patch --save
npm install jsonapter --save 
npm install fs --save 
npm install jxon --save 
```

## Create Test Directory
Finally, create the test directory.
```
mkdir test
```

## Write the Tests
Now you're ready to start writing tests.


## Run the Tests
Run the tests as follows:
```
npm test
```