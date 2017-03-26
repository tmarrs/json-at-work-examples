1) Install Gradle: Please see https://www.petrikainulainen.net/programming/gradle/getting-started-with-gradle-introduction/

Please see: 
https://www.petrikainulainen.net/programming/gradle/getting-started-with-gradle-our-first-java-project/
2) mkdir java-json-gradle

3) Create build.gradle as follows:
apply plugin: 'java'

4) Directory Structure & Tasks: 
Please see: https://www.petrikainulainen.net/programming/gradle/getting-started-with-gradle-our-first-java-project/


4a) Directory Structure (change wording):
The src/main/java directory contains the source code of our project.
The src/main/resources directory contains the resources (such as properties files) of our project.
The src/test/java directory contains the test classes.
The src/test/resources directory contains the test resources.

All output files of our build are created under the build directory. This directory contains the following
subdirectories which are relevant to this blog post (there are other subdirectories too, but we will talk
about them in the future):

The classes directory contains the compiled .class files.
The libs directory contains the jar or war files created by the build.


4b) Tasks (change wording):

The assemble task compiles the source code of our application and packages it to a jar file. This task 
doesn’t run the unit tests.
The build task performs a full build of the project.
The clean task deletes the build directory.
The compileJava task compiles the source code of our application.

run gradle tasks 

5) Settings:
http://mrhaki.blogspot.com/2012/06/gradle-goodness-set-java-compiler.html

6) Add dependencies:
https://www.petrikainulainen.net/programming/gradle/getting-started-with-gradle-dependency-management/

7) Run a Unit test.
https://www.testwithspring.com/lesson/running-unit-tests-with-gradle/


Spring Boot REST: https://spring.io/guides/gs/rest-service/
(put this into another file)
