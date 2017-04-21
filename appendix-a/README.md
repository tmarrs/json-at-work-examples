Installation Guides
===================
Installation Guides for [__JSON at Work__](https://github.com/tmarrs/json-at-work-examples/blob/master/README.md).


## Contents
- [Install JSON Tools in the Browser](#install-json-tools-in-the-browser)
    - [Install JSONView in Chrome and Firefox](#install-jsonview-in-chrome-and-firefox)
    - [JSONLint](#jsonlint)
    - [Install Postman](#install-postman)
- [Install JSONPad](#install-jsonpad)
- [Install Node.js](#install-nodejs)
    - [Install Node.js on Mac OS X and Linux with NVM](#install-nodejs-on-mac-os-x-and-linux-with-nvm)
        - [Install and Configure NVM](#install-and-configure-nvm)
        - [Install Node](#install-node)
        - [Avoiding `sudo` with npm](#avoiding-sudo-with-npm)
        - [Avoiding `sudo` with npm - Option 2](#avoiding-sudo-with-npm---option-2)
        - [Taming the REPL](#taming-the-repl)
    - [Install Node.js on Windows](#install-nodejs-on-windows)
    - [Uninstall Node.js](#uninstall-nodejs)
        - [Uninstall Node.js on Mac OS X](#uninstall-nodejs-on-mac-os-x)
        - [Uninstall Node.js on Linux](#uninstall-nodejs-on-linux)
        - [Uninstall Node.js on Windows](#uninstall-nodejs-on-windows)
    - [Install Yeoman](#install-yeoman)
        - [Install the `webapp` Yeoman Generator](#install-the-webapp-yeoman-generator)
    - [Install npm Modules](#install-npm-modules)
        - [Install `jsonlint`](#install-jsonlint)
        - [Install `json`](#install-json)
        - [Install `ujs-jsonvalidate`](#install-ujs-jsonvalidate)
        - [Install `http-server`](#install-http-server)
        - [Install `json-server`](#install-json-server)
        - [Install `crest`](#install-crest)
- [Install Ruby on Rails (RoR)](#install-ruby-on-rails-ror)
    - [Install Rails on Mac OS X and Linux](#install-rails-on-mac-os-x-and-linux)
    - [Install Rails on Windows](#install-rails-on-windows)
    - [Install Ruby Gems](#install-ruby-gems)
        - [Install `multi_json`](#install-multijson)
        - [Install `oj`](#install-oj)
        - [Install `awesome_print`](#install-awesomeprint)
        - [Install `activesupport`](#install-activesupport)
        - [Install `mailcatcher`](#install-mailcatcher)
- [Install MongoDB](#install-mongodb)
- [Install The Java Environment](#install-the-java-environment)
    - [Install Java SE](#install-java-se)
        - [Java Setup on Mac OS X](#java-setup-on-mac-os-x)
        - [Java Setup on Linux](#java-setup-on-linux)
        - [Java Setup on Windows](#java-setup-on-windows)
    - [Install Maven](#install-maven)
        - [Install JUnit - Add to the POM](#install-junit---add-to-the-pom)
    - [Using Eclipse with Maven](#using-eclipse-with-maven)
- [Install `jq`](#install-jq)
- [Install `cURL`](#install-curl)
    - [Install `cURL` on Mac OS X](#install-curl-on-mac-os-x)
    - [Install `cURL` on Linux](#install-curl-on-linux)
    - [Install `cURL` on Windows](#install-curl-on-windows)
- [Install Apache Kafka](#install-apache-kafka)
    - [Install Kafka on Mac OS X](#install-kafka-on-mac-os-x)
    - [Install Kafka on UNIX](#install-kafka-on-unix)
    - [Install Kafka on Windows](#install-kafka-on-windows)
- [References](#references)


## Install JSON Tools in the Browser
### Install JSONView in Chrome and Firefox
JSONView pretty-prints JSON in Chrome or Firefox. Please follow the installation instructions on the [JSONView site](http://jsonview.com/) for your browser.

### JSONLint
Use [JSONLint](http://www.jsonlint.com) to validate JSON documents online.

### Install Postman
Postman provides the ability to fully test a RESTful API. It can send HTTP `GET`,
`POST`, `PUT`, and `DELETE` requests and set HTTP Headers. You can install Postman as a Chrome extension
or as a standalone GUI application on Mac OS X, Linux, or Windows. Please visit the [Postman site](https://www.getpostman.com/) for installation instructions.


## Install JSONPad
You can download JSONPad from the [JSONPad Downloads page](https://code.google.com/p/json-pad/downloads/list).
JSONPad in its current form runs on Adobe AIR, which requires a separate install. You can download Adobe AIR at: [https://get.adobe.com/air/](https://get.adobe.com/air/).

Unfortunately, Google Code is shutting down due to the popularity of GitHub, so I recently exported this project to [my own `json-pad` GitHub Repository](https://github.com/tmarrs/json-pad) to preserve the codebase. My hope is to eventually re-platform this excellent tool from Adobe AIR to [NW.js (formerly known as Node Webkit)](http://nwjs.io/) so that it will run as a cross-platform compatible GUI. But this effort will have to wait until the book is published.


## Install Node.js
This book uses Node.js version `v4.2.2`.

If Node.js is working properly on your machine, then you should see the following from the command line when you check the version number:

```
json-at-work => node -v
v4.2.2
```

When you check out the Node.js [REPL (Request-Eval-Print-Loop)](https://nodejs.org/api/repl.html), you should see this:

```
json-at-work => node
> .exit
json-at-work =>
```

### Install Node.js on Mac OS X and Linux with NVM
Now that Node.js is completely uninstalled, let's do a fresh instllation. Although you could use the installation package from the [Node.js site](https://nodejs.org/), it's difficult to change versions. Instead, let's use [NVM (Node Version Manager)](https://github.com/creationix/nvm). NVM makes it easy to install/uninstall Node.js, and upgrade to newer versions.

#### Install and Configure NVM
First, install NVM by using one of the following methods:
* [Install Script](https://github.com/creationix/nvm#install-script)
* [Manual Install](https://github.com/creationix/nvm#manual-install)

Next, let's make sure that NVM runs properly. Source it from a shell as follows: ```source ~/.nvm/nvm.sh```
Now NVM will work properly for the remainder of the installation process.

If you're running bash, then do the following file to so that NVM is automatically sourced (i.e., configured) upon login. If you're running bash, then do the following:
* In ```$HOME/.bashrc```, add these lines:
```
source ~/.nvm/nvm.sh
export NVM_HOME=~/.nvm/v4.2.2
```
* In ```$HOME/.bashrc_profile```, add this line:
```
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM
```

Please note that similar steps apply to Bourne Shell or Korn Shell.

#### Install Node
Now that NVM is installed, use it to install Node:
* Type `nvm ls-remote` to see what remote (i.e., not on your local machine) versions of Node are available to install.
* Install version `v4.2.2` with the following command: `nvm install v4.2.2`
  * All Node versions are installed in `$HOME/.nvm`
* Set the default Node version to be used in any new shell: `nvm alias default v4.2.2`
  * Without this, neither the `node` or `npm` commands will work properly when you exit the current shell.
  * Now, exit your current shell.

From a new shell, upgrade to the latest version of npm:

```
npm update -g npm
```

Then, do the following health checks:
  * `nvm ls`. You should see:
```
          ->  v4.2.2
               system
          default -> v4.2.2
```
  * `node -v`, which yields:
```
          v4.2.2
```
  * `npm -v`, and it looks like:
```
          3.3.10
```

To see a full list of NVM's capabilities, type: `nvm --help`.

#### Avoiding `sudo` with npm
npm may require you to run as `sudo`, and this can get cumbersome and annoying. This also can be a security risk because packages can contain scripts, and npm is running with root privilege. To avoid this do the following:

```
sudo chown -R $USER ~/.nvm
```

This works if you installed node with NVM (all node installations go under that directory).
This tip was inspired by Isaac Z. Schlueter from [How to Node](http://howtonode.org/introduction-to-npm).

#### Avoiding `sudo` with npm - Option 2
Here's another way to avoid `sudo` - please see the [NPM Global without Sudo Guide](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) provided by [Sindre Sorhus](https://github.com/sindresorhus).

#### Taming the REPL
Out of the box, the default behavior of the REPL leaves a bit to be desired because you 'undefined' after most lines of JavaScript, hitting the Enter key, breathing, etc. This is due to the fact that JavaScript functions always return something. If nothing is returned, then 'undefined' is returned by default. This behavior can be very annoying and unproductive. Here's a sample session:

```
json-at-work => node
> # Hit Enter
undefined
>
> var y = 5
undefined
> .exit
```

To turn off 'undefined' in the REPL, add the following to `.bashrc` (or your setup for Bourne or Korn Shell):

```
source ~/.nvm/nvm.sh

...

alias mynode="node -e \"require('repl').start({ignoreUndefined: true})\""
```

Now, exit the current shell and start a new shell. Rather than re-defining `node`, it's safer to define a new alias (in this case, `mynode`). This way, `node` will still work properly from the command line and be able to run JavaScript files.
Meanwhile, `mynode` serves as your new REPL command.

```
json-at-work => mynode
>
> var x = 5
> .exit
```

You now have a Node REPL that does what you want - no more annoying 'undefined'. You're welcome. :smile:


### Install Node.js on Windows
NVM also works well on on Windows. You can try the following options on Windows, Use [nvm-windows](https://github.com/coreybutler/nvm-windows)

FIXME - Fill in this section.

If this doesn't work, you may want to avoid this headache and use [CodingGround](https://www.tutorialspoint.com/codingground.htm) to run your Node.js environment in the Cloud rather than on Windows.


### Uninstall Node.js
If you have a previous installation of Node.js that isn't quite working properly anymore, you may need to completely uninstall it from your machine. This includes both the `node` and `npm` executables.

#### Uninstall Node.js on Mac OS X
Uninstalls can be complicated, and credit for the Mac uninstall instructions goes to [Clay at Hungred Dot Com](http://hungred.com/how-to/completely-removing-nodejs-npm/). If `homebrew` was used to install Node.js, then simply type `brew uninstall node` at the prompt.

If you didn't use `homebrew`, do the following:
* cd to `/usr/local/lib` and delete any `node` executable and `node_modules`
* cd to `/usr/local/include` and delete any node and node_modules directory
* cd to `/usr/local/bin` and delete any `node` executable

You may also need to do the following:
```
rm -rf /usr/local/bin/npm
rm -rf /usr/local/share/man/man1/node.1
rm -rf /usr/local/lib/dtrace/node.d
rm -rf $USER/.npm
```

#### Uninstall Node.js on Linux
Credit for the Linux uninstall instructions goes to [Stack Overflow](http://stackoverflow.com/questions/5650169/uninstall-node-js-using-linux-command-line) and [GitHub](https://github.com/joyent/node/issues/4058).
Do the following:
* Find the node installation by typing `which node`. Let's assume it's at `/usr/local/bin/node`
* cd to `/usr/local`
* Execute the following:
```
sudo rm -rf bin/node
sudo rm -rf bin/npm
sudo rm -rf lib/node_modules/npm
sudo rm -rf lib/node
sudo rm -rf share/man/*/node.*
```

#### Uninstall Node.js on Windows
Credit for the Windows uninstall instructions goes to [Team Treehouse](http://blog.teamtreehouse.com/install-node-js-npm-windows). Here are the steps:
* Open the Windows Control Panel.
* Choose “Programs and Features”.
* Click “Uninstall a program”.
* Select Node.js, and click the Uninstall link.


### Install Yeoman
Please refer to the [Yeoman Setup page](http://yeoman.io/codelab/setup.html).

#### Install the `webapp` Yeoman Generator
Please see the [`generator-webapp` GitHub page](https://github.com/yeoman/generator-webapp). Please follow the default installation so that the test environment includes both [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).

### Install npm Modules
We use the following npm modules at the command line, so we install them globally:
* [`jsonlint`](#install-jsonlint)
* [`json`](#install-json)
* [`ujs-jsonvalidate`](#install-ujs-jsonvalidate)
* [`http-server`](#install-http-server)
* [`json-server`](#install-json-server)

#### Install `jsonlint`
This is the npm equivalent of the [JSONLint site](http://ww.jsonlint.com) used to validate a JSON document. Here's the [`jsonlint` GitHub Repository](https://github.com/zaach/jsonlint).

To install:
```
npm install -g jsonlint
```

To validate a JSON document:
```
jsonlint basic.json
```

#### Install `json`
[`json`](https://github.com/trentm/json) provides the ability to work with JSON (i.e., pretty-printing, etc.) from the command line - it's similar to [`jq`](http://stedolan.github.io/jq/), but not as powerful.

To install:
```
npm install -g json
```

Please visit the [`json` GitHub repository](https://github.com/trentm/json) for usage instructions.
[`json` is available as an npm module](https://www.npmjs.com/package/json).

#### Install `ujs-jsonvalidate`
This is the npm equivalent of the [JSON Validate site](http://jsonvalidate.com/) used to valid a JSON document against a JSON Schema. Here's the [`ujs-jsonvalidate` GitHub Repository](https://github.com/usingjsonschema/ujs-jsonvalidate-nodejs).

To install:
```
npm install -g ujs-jsonvalidate
```

To validate a JSON document:
```
validate basic.json basic-schema.json
```

#### Install `http-server`
`http-server` is a simple Web Server that serves up files in the current directory structure on the local host system as static content. I like `http-server` because it has solid documentation, and the command line options and shutdown are intuitive. Here's the [`http-server` GitHub Repository](https://github.com/indexzero/http-server) and [`http-server` npm Repository](https://www.npmjs.com/package/http-server).

To install:
```
npm install -g http-server
```
To run:
```
http-server -p 8081
```

To access:
```
http://localhost:8081
```

To shutdown:
Press `Ctrl-C`

#### Install `json-server`
`json-server` is a stub REST server that takes a JSON file and exposes it as a RESTful service. Here's the [`json-server` GitHub Repository](https://github.com/typicode/json-server).

To install:
```
npm install -g json-server
```

To run:
```
json-server -p 5000 ./speakers.json
```

To access:
```
http://localhost:5000/speakers
```

#### Install `crest`
Crest is a small REST server that provides a RESTful wrapper for MongoDB. Please visit the 
[Crest Github Repository](https://github.com/cordazar/crest). The Global +npm+ install
would be the simplest way to install +crest+, but this is broken. Instead, do a +git clone+ as follows:
* `cd` to the directory where your other development projects reside. We'll call this directory `projects`: `cd projects`
* Clone the repository: `git clone git://github.com/Cordazar/crest.git`
* Navigate to the `crest` directory: `cd crest`
* Update the `config.json` file to remove the `username` and `password`. Of course this isn't secure,
but you can re-add these fields and set them to proper values later - just make sure that the settings match your MongoDB password. We just want to get started quickly. The `config.json` file should now look like this:
```
{
  "db": {
    "port": 27017,
    "host": "localhost"
  },
  "server": {
    "port": 3500,
    "address": "0.0.0.0"
  },
  "flavor": "normal",
  "debug": true
}
```
* Be sure to [install and start MongoDB](#install-mongodb) first.
* In a separate tab or command shell, start `crest`:
```
node server

DEBUG: util.js is loaded
DEBUG: rest.js is loaded
crest listening at http://:::3500
```

## Install Ruby on Rails (RoR)
There are several ways to install Ruby on Rails:
* [Rails Installer](http://railsinstaller.org)
* [ruby-install](https://github.com/postmodern/ruby-install)
* [RVM (Ruby Version Manager)](https://rvm.io/) + the `rails` gem
* [+rbenv+](https://github.com/sstephenson/rbenv) + the `rails` gem

### Install Rails on Mac OS X and Linux
I prefer RVM because for Mac OS X and Linux because it's easy to upgrade to switch between Ruby versions. Install RVM by visiting the [RVM site](https://rvm.io/) and following the [installation instructions](https://rvm.io/rvm/install).

Use RVM to install Ruby as follows:
* See the available versions of Ruby
```
rvm list known
```
* Install Ruby `v2.4.0` as follows:
```
rvm install 2.4.0
```
* Check the Ruby version, and you should see something like this.
```
ruby -v
ruby 2.4.0
```

After installing Ruby, you can install Rails as follows:
```
gem install rails
```

Check Rails version, and it should look like:
```
rails -v
Rails Rails 5.0.2
```

And you're done.

You can easily upgrade to new versions of Ruby and Rails by:
* Installing a new version of Ruby (2.x for example): `rvm install 2.x`
* Using the new version: `rvm use 2.x`
* Then install the `rails` gem as shown above.

### Install Rails on Windows
Use [Rails Installer](http://railsinstaller.org) for a Windows environment, and do the following:
* Download the installer for Windows.
* Run the installer and follow the defaults.

I've used [Rails Installer](http://railsinstaller.org) on Windows 7, and it worked properly.
The [Rails Installer](http://railsinstaller.org) page has excellent information on RoR tutorials and
how to get help with installation issues. 

### Install Ruby Gems
We use the following Ruby Gems outside of Rails, so we install them globally:
* [`multijson`](#install-multi_json)
* [`oj`](#install-oj)
* [`awesome_print`](#install-awesome_print)
* [`activesupport`](#install-activesupport)
* [`minitest`](#install-minitest)
* [`mailcatcher`](#install-mailcatcher)

#### Install `multi_json`
[`multi_json`](https://github.com/intridea/multi_json) provides a wrapper that invokes the most common JSON gems on behalf of the caller by choosing the fastest JSON gem that has been loaded in an application's environment. Install it as follows:

```
gem install multi_json
```

#### Install `oj`
[`oj`](https://github.com/ohler55/oj), (Optimized JSON), is considered by many to be the fastest Ruby-based
JSON processor available. Install it as follows:

```
gem install oj
```

#### Install `awesome_print`
[awesome_print](https://github.com/awesome-print/awesome_print) pretty-prints a Ruby object and is used for
debugging purposes. Install it as follows:

```
gem install awesome_print
```

#### Install `activesupport`
[`activesupport`](https://github.com/rails/rails/tree/master/activesupport) provides functionality that has been extracted from Rails. ActiveSupport's JSON module provides the ability to convert keys between camel case and snake case. Install it as follows:

```
gem install activesupport
```

#### Install `mailcatcher`
[`mailcatcher`](https://mailcatcher.me) is a very simple mail (i.e., SMTP) server. It's a great tool for testing emails without forcing you to send a real email. Install it as follows:

```
gem install mailcatcher
```


## Install MongoDB
Please see the [MongoDB installation documentation](https://docs.mongodb.com/manual/installation/) and follow the instructions to install and start MongoDB on your platform.

## Install The Java Environment
Our Java environment depends on:
* [Java SE](#install-java-se)
* [Maven](#install-maven)

### Install Java SE
We're using Java SE (Standard Edition) 8 for this book, so please visit the [Oracle Java SE 8 download site](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

You'll see the term "JDK" (Java Developer Kit) on that page. JDK is the old name for Java SE. Just look for "Java SE Development Kit", accept the license agreement, and do the proper download for your operating system. After you've downloaded and run the installer, you'll want to setup your Java command line environment for your operating system.

Follow the instructions below for you system. Then run `java -version`, and you should see something similar to this:
```
java version "1.8.0_72"
Java(TM) SE Runtime Environment (build 1.8.0_72-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.72-b15, mixed mode)
```

#### Java Setup on Mac OS X
In `.bashrc`, do the following:
```
...

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.x.y.jdk/Contents/Home # x and y are the minor and patch versions

...

export PATH=...:${JAVA_HOME}/bin:... # JAVA_HOME to your PATH
```

#### Java Setup on Linux
In `.bashrc`, do the following:
```
...

export JAVA_HOME=/usr/java/jdk1.x.y/bin/java # x and y are the minor and patch versions

...

export PATH=...:${JAVA_HOME}/bin:... # Add JAVA_HOME to your PATH
```

Then, refresh your environment: `source ~/.bashrc`

Credit for Java setup on Linux goes to [nixCraft](http://www.cyberciti.biz/faq/linux-unix-set-java_home-path-variable/).

#### Java Setup on Windows
The Java Windows Installer usually puts the JDK in one of the following directories:
`C:\Program Files\Java` or `C:\Program Files (x86)\Java`.

Then, do the following:
* Right-click the `My Computer` icon on your desktop and select `Properties`.
* Click the `Advanced` tab.
* Click the `Environment Variables` button.
* Under `System Variables`, click `New.``
* Enter the variable name as `JAVA_HOME`.
* Enter the variable value as the installation path for the Java Development Kit (see where the installer put the JDK directory).
* Click `OK`.
* Click `Apply Changes`.

Credit for the Java setup on Windows goes to [Robert Sindall](http://www.robertsindall.co.uk/blog/setting-java-home-variable-in-windows/).

### Install Maven
* Be sure to install [Java SE](#install-java-se) first.
* Visit the [Maven Download page](http://maven.apache.org/download.cgi) to download a Maven zip or tar file.
* Follow the [Maven Installation Instructions](http://maven.apache.org/download.cgi#Installation) for your system.
* Run `mvn --version`, and you should see something like this:
```
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T09:41:47-07:00)
Maven home: /Users/tmarrs/apache-maven-3.3.9
Java version: 1.8.0_72, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_72.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.11.2", arch: "x86_64", family: "mac"
```

For further reference, please see [Maven in 5 Minutes](http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html).

#### Install JUnit - Add to the POM
[JUnit](http://junit.org/) isn't a separate install - just add it to the [Maven POM (Project Object Model)](https://maven.apache.org/pom.html):

```
<dependency>
	<groupId>junit</groupId>
	<artifactId>junit</artifactId>
	<version>4.12</version>
</dependency>
```

### Using Eclipse with Maven
Use the following Maven command to integrate with Eclipse: `mvn ecplise:eclipse`

## Install `jq`
[`jq`](http://stedolan.github.io/jq/) provides JSON-based command-line processing.
To install it, just follow the [Download instructions on the `jq` GitHub repository](http://stedolan.github.io/jq/download/).

`jq` works with and depends on [`cURL`](#install-curl)

## Install `cURL`
[`cURL`](http://curl.haxx.se/) provides the ability to communicate over multiple protocols, including HTTP. Use this to make HTTP calls to RESTful APIs from the command line.

### Install `cURL` on Mac OS X
Just like with Linux, `cURL` may already be installed on your Mac. Check it as follows:

```
curl --version
```

If it's already there, then there's nothing else to do. Otherwise, you'll need to install it.
I use [Homebrew](http://brew.sh/) as my package installer on Mac OS X, so use the following command to install `cURL` on a Mac:
```
brew install curl
```

### Install `cURL` on Linux
Check if `cURL` is already installed by entering the following command:

```
curl --version
```

If it isn't there, then do the foollowing from the command line:

```
sudo apt-get install curl
```

This should work on Ubuntu or Debian.

### Install `cURL` on Windows
To install `cURL` on Windows, do the following:
* Visit the [`cURL` Download Wizard](http://curl.haxx.se/dlwiz/)
* Select the type of package: __curl executable__
* Select the Operating System: either Windows / Win32 or Win64
* Select the Flavor - either `Cygwin` (if you use [Cygwin](https://www.cygwin.com/)) or `Generic` (if you don't use [Cygwin](https://www.cygwin.com/))
* Select the Win32 Version (only if you selected Windows / Win32 above): __Unspecified__

Credit for the `cURL` Windows install instructions goes to [Stack Overflow](http://stackoverflow.com/questions/9507353/how-do-i-install-set-up-and-use-curl-on-a-windows).

## Install Apache Kafka
We use [Apache Kafka](http://kafka.apache.org/) in Chapter 10 for JSON-based messaging. Kafka depends
on [Apache Zookeeper](http://zookeeper.apache.org/), so you'll need to install Zookeeper, too.
Before going any further, please be sure to [install The Java Environment](#install-the-java-environment) on your machine (because Kafka is based on Java).

### Install Kafka on Mac OS X
[Homebrew](http://brew.sh/) is the easiest way to install Kafka on Mac OS X.
Do the following from the command line:
```
brew install kafka
```

This installs both Kafka and Zookeeper. You're done.

### Install Kafka on UNIX
Install Zookeeper as follows:
* Download Zookeeper from the [Zookeeper Releases page](http://zookeeper.apache.org/releases.html#download).
* Extract the TAR file from the GZipped file you downloaded: `tar -zxf zookeeper-3.4.9.tar.gz` (Current/latest Zookeeper download)
* Add System Environment Variables:
  * In `~/.bashrc`: 
```
export ZOOKEEPER_HOME = <Zookeeper-Install-Path>/zookeeper-3.4.9
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```

Install Kafka as follows:
* Download Kafka from the [Kafka Downloads page](http://kafka.apache.org/downloads.html).
* Extract the TAR file from the GZipped file you downloaded: `tar -zxf  kafka_2.11-0.10.1.1.tgz` (Current/latest Kafka download)
* * Add System Environment Variables:
  * In `~/.bashrc`: 
```
export KAFKA_HOME = <Kafka-Install-Path>/zookeeper-3.4.9
export PATH=$PATH:$KAFKA_HOME/bin
```

Credit for the Apache Kafka installation on Windows instructions goes to [TutorialsPoint](https://www.tutorialspoint.com/apache_kafka/apache_kafka_installation_steps.htm).


### Install Kafka on Windows
Install Zookeeper as follows:
* Download Zookeeper from the [Zookeeper Downloads page](http://zookeeper.apache.org/releases.html#download).
* Use your favorite Zip tool to unzip the Zookeeper file to the `C:` drive.
* Add System Variables as follows:
  * In Windows, navigate to: `Control Panel ==> System ==> Advanced System Settings ==> Environment Variables`
  * Create the following new System Variable: `ZOOKEEPER_HOME = C:\zookeeper-3.4.9` (Current/latest Zookeeper download)
  * Add Zookeeper to your `PATH` by editing that variable and adding `;%ZOOKEEPER_HOME%\bin;` at the end.
Install Kafka as follows:
* Download Kafka from the [Kafka Downloads page](http://kafka.apache.org/downloads.html).
* Use your favorite Zip tool to unzip the Kafka file to the `C:` drive.
* * Add System Variables as follows:
  * In Windows, navigate to: `Control Panel ==> System ==> Advanced System Settings ==> Environment Variables`
  * Create the following new System Variable: `KAFKA_HOME = C:\kafka_2.11-0.10.1.1` (Current/latest Kafka download)
  * Add Kafka to your `PATH` by editing that variable and adding `;%KAFKA_HOME%\bin;` at the end.

Credit for the Apache Kafka installation on Windows instructions goes to [Gopal Tiwari's article on DZone](https://dzone.com/articles/running-apache-kafka-on-windows-os).


## References
TOC generated by [md-toc](https://www.npmjs.com/package/md-toc).
