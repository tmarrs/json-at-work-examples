Chapter 4
=========

## Contents
- [Testing and Compiling](#testing-and-compiling)
- [Using Eclipse](#using-eclipse)
- [How the Project Was Created](#how-the-project-was-created)

We'll use [Apache Maven](http://maven.apache.org/) to build and run this project. [JUnit](http://junit.org/) is our unit testing framework.

If you use the code "as is", then you don't need to do any setup (other than [installing Maven](https://github.com/tmarrs/json-at-work-examples/tree/master/appendix-a#installing-maven)).
If you're curious about setup, then take a look at the [How the Project Was Created](#how-the-project -was-created) section.


## Testing and Compiling
The project already has a [POM (Project Object Model)](http://maven.apache.org/guides/introduction/introduction-to-the-pom.html) file to describe dependencies, so you only need to test, compile, and clean.

To run the JUnit tests, run the following: `mvn test`
This compiles the code and runs unit tests.

If you just want to compile, run: `mvn compile`

To clean up the results of compiling or testing, run: `mvn clean`
to delete the `target` directory and start fresh.


## Using Eclipse
This project is already configured to use Eclipse, and here's the command
that was used to generate the configuration files: `mvn ecplise:eclipse`


## How the Project Was Created
This project was created with the following Maven command:

```
mvn archetype:create -DgroupId=org.jsonatwork.ch4 -DartifactId=java-json
```