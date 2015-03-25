Installation Guide
==================
Installation Guide for [__JSON at Work__](https://github.com/tmarrs/json-at-work/blob/master/README.md).

## Contents
- [Installing JSON Tools in the Browser](#installing-json-tools-in-the-browser)
    - [Installing JSONView in Chrome and Firefox](#installing-jsonview-in-chrome-and-firefox)
    - [JSONLint](#jsonlint)
- [Installing JSONPad](#installing-jsonpad)
- [Installing Node.js](#installing-nodejs)
    - [Install Node.js on Mac OS X and Linux with NVM](#install-nodejs-on-mac-os-x-and-linux-with-nvm)
        - [Install and Confgiure NVM](#install-and-confgiure-nvm)
        - [Install Node](#install-node)
        - [Avoiding ```sudo``` with npm](#avoiding-sudo-with-npm)
        - [Taming the REPL](#taming-the-repl)
    - [Install Node.js on Windows](#install-nodejs-on-windows)
    - [Uninstalling Node.js](#uninstalling-nodejs)
        - [Uninstalling Node.js on Mac OS X](#uninstalling-nodejs-on-mac-os-x)
        - [Uninstalling Node.js on Windows](#uninstalling-nodejs-on-windows)
        - [Uninstalling Node.js on Linux](#uninstalling-nodejs-on-linux)
- [Installing Ruby on Rails (RoR)](#installing-ruby-on-rails-ror)
    - [Installing with RVM + the ```rails``` Gem](#installing-with-rvm--the-rails-gem)
    - [Rails on Windows](#rails-on-windows)
- [Installing MySQL](#installing-mysql)
- [References](#references)

## Installing JSON Tools in the Browser
### Installing JSONView in Chrome and Firefox
Please follow the installation instructions on the [JSONView site](http://jsonview.com/) for your browser.

### JSONLint
Use [JSONLint](http://www.jsonlint.com) to validate JSON documents online.

## Installing JSONPad
You can download JSONPad from the [JSONPad Downloads page](https://code.google.com/p/json-pad/downloads/list).
JSONPad in its current form runs on Adobe AIR, but it should be included in the install.

Unfortunately, Google Code is shutting down due to the popularity of GitHub, so I recently exported this project to
[my own ```json-pad``` GitHub Repository](https://github.com/tmarrs/json-pad) to preserve the codebase. My hope is to eventually re-platform this excellent tool on Node Webkit (rather than Adobe AIR) so that it will run as a cross-platform compatible GUI. But this effort will have to wait until the book is published.


## Installing Node.js
This book uses Node.js version ```v0.10.32```.

If Node.js is working properly on your machine, then you should see the following from the command line when you check the version number:

```
json-at-work => node -v
v0.10.32
```

When you check out the Node.js [REPL (Request-Eval-Print-Loop)](https://nodejs.org/api/repl.html), you should see this:

```
json-at-work => node
> .exit
json-at-work =>
```


### Install Node.js on Mac OS X and Linux with NVM
Now that Node.js is completely uninstalled, let's do a fresh instllation. Although you could use the installation package from the [Node.js site](https://nodejs.org/), it's difficult to change versions. Instead, let's use [NVM (Node Version Manager)](https://github.com/creationix/nvm). NVM makes it easy to install/uninstall Node.js, and upgrade to newer versions.

#### Install and Confgiure NVM
First, install NVM by using one of the following methods:
* [Install Script](https://github.com/creationix/nvm#install-script)
* [Manual Install](https://github.com/creationix/nvm#manual-install)

Next, let's make sure that NVM runs properly. Source it from a shell as follows: ```source ~/.nvm/nvm.sh```
Now NVM will work properly for the remainer of the installation process.

If you're running bash, then do the following file to so that NVM is automatically sourced (i.e., configured) upon login. If you're running bash, then do the following:
* In ```$HOME/.bashrc```, add these lines:
```
source ~/.nvm/nvm.sh
export NVM_HOME=~/.nvm/v0.10.32
```
* In ```$HOME/.bashrc_profile```, add this line:
```
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM
```

Please note that similar steps apply to Bourne Shell or Korn Shell.

#### Install Node
Now that NVM is installed, use it to install Node:
* Type ```nvm ls-remote``` to see what remote (i.e., not on your local machine) versions of Node are available to install.
* Install version ```v0.10.32``` with the following command: ```nvm install v0.10.32```
  * All Node versions are installed in ```$HOME/.nvm```
* Set the default Node version to be used in any new shell: ```nvm alias default v0.10.32```
  * Without this, neither the 'node' or 'npm' commands will work properly when you exit the current shell.
  * Now, exit your current shell.

From a new shell, do the following health checks:
  * ```nvm ls```. You should see:
```
          ->  v0.10.32
               system
          default -> v0.10.32
```
  * ```node -v```, which yields:
```
          v0.10.32
```
  * ```npm -v```, and it looks like:
```
          1.4.28
```

To see a full list of NVM's capabilities, type: ```nvm --help```.

#### Avoiding ```sudo``` with npm
npm may require you to run as ```sudo```, and this can get cumbersome and annoying. This also can be a security risk because packages can contain scripts, and npm is running with root privilege. To avoid this do the following:

```
sudo chown -R $USER ~/.nvm
```

This works if you installed node with NVM (all node installations go under that directory).
This tip was inspired by Isaac Z. Schlueter from [How to Node](http://howtonode.org/introduction-to-npm).

#### Taming the REPL
Out of the box, the default behavoir of the REPL leaves a bit to be desired because you 'undefined' after most lines of JavaScript, hitting the Enter key, breathing, etc. This is due to the fact that JavaScript functions always return something. If nothing is returned, then 'undefined' is returned by default. This behavior can be very annoying and unproductive. Here's a sample session:

```
json-at-work => node
> # Hit Enter
undefined
>
> var y = 5
undefined
> .exit
```

To turn off 'undefined' in the REPL, add the following to ```.bashrc``` (or your setup for Bourne or Korn Shell):

```
source ~/.nvm/nvm.sh

...

alias mynode="node -e \"require('repl').start({ignoreUndefined: true})\""
```

Now, exit the current shell and start a new shell. Rather than re-defining ```node```, it's safer to define a new alias (in this case, ```mynode```). This way, ```node``` will still work properly from the command line and be able to run JavaScript files.
Meanwhile, ```mynode``` serves as your new REPL command.

```
json-at-work => mynode
>
> var x = 5
> .exit
```

You now have a Node REPL that does what you want - no more annoying 'undefined'. You're welcome. :smile:


### Install Node.js on Windows
NVM works well on Mac OS X and Linux, but it doesn't work on Windows. You can try the following options on Windows:
* [nvmw](https://github.com/hakobera/nvmw)
* [nvm-windows](https://github.com/coreybutler/nvm-windows)

If NVM dpesn't work for your Windows environment, then try one of the following options:
* Please follow [Team Treehouse's instructions for installing Node on Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows).
* Use [Nitrous.io](https://www.nitrous.io/) to run your Node.js environment in the Cloud rather than on Windows. Please note that Nitrous.io has both free and commercial usage plans.


### Uninstalling Node.js
If you have a previous installation of Node.js that isn't quite working properly anymore, you may need to completely uninstall it from your machine. This includes both the ```node``` and ```npm``` executables.

#### Uninstalling Node.js on Mac OS X
Uninstalls can be complicated, and credit for the Mac uninstall instructions goes to [Clay at Hungred Dot Com](http://hungred.com/how-to/completely-removing-nodejs-npm/). If ```homebrew``` was used to install Node.js, then simply type ```brew uninstall node``` at the prompt.

If you didn't use ```homebrew```, do the following:
* cd to ```/usr/local/lib``` and delete any ```node``` executable and ```node_modules```
* cd to /usr/local/include and delete any node and node_modules directory
* cd to ```/usr/local/bin``` and delete any ```node``` executable

You may also need to delete the following:
* ```rm -rf /usr/local/bin/npm```
* ```rm -rf /usr/local/share/man/man1/node.1```
* ```rm -rf /usr/local/lib/dtrace/node.d```
* ```rm -rf $USER/.npm```

#### Uninstalling Node.js on Windows
Credit for the Windows uninstall instructions goes to [Team Treehouse](http://blog.teamtreehouse.com/install-node-js-npm-windows). Here are the steps:
* Open the Windows Control Panel.
* Choose “Programs and Features”.
* Click “Uninstall a program”.
* Select Node.js, and click the Uninstall link.

#### Uninstalling Node.js on Linux
Credit for the Linux uninstall instructions goes to [Stack Overflow](http://stackoverflow.com/questions/5650169/uninstall-node-js-using-linux-command-line) and [GitHub](https://github.com/joyent/node/issues/4058).
Do the following:
* Find the node installation by typing ```which node```. Let's assume it's at ```/usr/local/bin/node```
* cd to ```/usr/local```
* Execute the following:
  * ```sudo rm -rf bin/node```
  * ```sudo rm -rf bin/npm```
  * ```sudo rm -rf lib/node_modules/npm```
  * ```sudo rm -rf lib/node```
  * ```sudo rm -rf share/man/*/node.*```


## Installing Ruby on Rails (RoR)
There are several ways to install Ruby on Rails:
* [Rails Installer](http://railsinstaller.org)
* [ruby-install](https://github.com/postmodern/ruby-install)
* RVM (Ruby Version Manager) + the ```rails``` gem
* +rbenv+ + the ```rails``` gem

### Installing with RVM + the ```rails``` Gem
I prefer RVM because it's easy to upgrade to switch between Ruby versions.
Install RVM by visiting the [RVM site](https://rvm.io/) and following the [installation instructions](https://rvm.io/rvm/install).

Use RVM to install Ruby as follows:
* See the available versions of Ruby
```
rvm list known
```
* Install Ruby ```v2.2.0``` as follows:
```
rvm install 2.2.0
```
* Check the Ruby version, and you should see something like this.
```
ruby -v
ruby 2.2.0
```

After installing Ruby, you can install Rails as follows:
```
gem install rails
```

Check Rails version, and it should look like:
```
json-at-work => rails -v
Rails 4.2.1
```

And you're done.

You can easily upgrade to new versions of Ruby and Rails by:
* Installing a new version of Ruby (2.3 for example): ```rvm install 2.3```
* Using the new version: ```rvm use 2.3```
* Then install the ```rails``` as shown above.

### Rails on Windows
Rails is difficult to setup on Windows. Try the Rails Installer for a Windows environment. If this doesn't work, you may want to avoid this headache and use [Nitrous.io](https://www.nitrous.io/) to run your Ruby on Rails environment in the Cloud rather than on Windows.


## Installing MySQL
The Ruby on Rails examples require MySQL because Rails insists on a database. Of course, it's possible to run a Ruby on Rails project without a database, but that takes a lot of configuration and you're definitely swimming upstream. Just give Rails what it wants, and install MySQL.

This book uses MySQL 5.6, and you can download and install it by following the [MySQL Installation Instructions](https://dev.mysql.com/doc/refman/5.6/en/installing.html).

Or if you're on a Mac, you can use Hombrew as follows:

```
brew install mysql
```

To uninstall, you would do the opposite:

```
brew uninstall mysql
```

After installing MySQL, you'll need to start the server. You'll probably want to ensure that MySQL starts automatically upon system startup. For further details on MySQL installation, startup, and configuration, please visit:
* [MySQL's Post Installation Setup and Testing](https://dev.mysql.com/doc/refman/5.6/en/postinstallation.html)
* [Joe Fallon's blog](http://blog.joefallon.net/2013/10/install-mysql-on-mac-osx-using-homebrew/)


## References
TOC generated by NPM [md-toc](https://www.npmjs.com/package/md-toc).
