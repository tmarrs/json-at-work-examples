Installation Guide
==================
Installation Guide for [__JSON at Work__](https://github.com/tmarrs/json-at-work/blob/master/README.md).

## Contents
- [Installing JSON Tools in the Browser](#installing-json-tools-in-the-browser)
  - [Installing JSONView in Chrome and Firefox](#installing-jsonview-in-chrome-and-firefox)

- [Installing JSONPad](#installing-jsonpad)
- [Installing Node with NVM](#installing-node-with-nvm)
- [Installing Ruby on Rails](#installing-ruby-on-rails)
  - [Installing Ruby](#installing-ruby)
  - [Installing Rails](#installing-rails)

- [Installing MySQL](#installing-mysql)

## Installing JSON Tools in the Browser
### Installing JSONView in Chrome and Firefox
Please follow the installation instructions on the [JSONView site](http://jsonview.com/) for your browser.

### JSONLint
Use [JSONLint](http://www.jsonlint.com) to validate JSON documents online.

## Installing JSONPad
You can download JSONPad from the [JSONPad Downloads page](https://code.google.com/p/json-pad/downloads/list).

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
This tip was inspired by [How to Node](http://howtonode.org/introduction-to-npm).

#### Taming the REPL
Out of the box, the REPL leaves a bit to be desired because you 'undefined' after most lines of JavaScript, hitting the Enter key, breathing, etc. which is very annoying and unproductive. Here's a sample session:

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

If you have a previous installation of Node.js that isn't quite working properly anymore, you may need to completely uninstall it from your machine. This includes both the ```node``` and ```npm``` executables.

### Uninstalling Node.js on Mac OS X
Uninstalls can be complicated, and credit for the Mac uninstall instructions goes to [Clay at Hungred Dot Com](http://hungred.com/how-to/completely-removing-nodejs-npm/). If ```homebrew``` was used to install Node.js, then simply type ```brew uninstall node``` at the prompt.

If you didn't use ```homebrew```, do the following:
* cd to ```/usr/local/lib``` and delete any ```node``` executable and ```node_modules```
* cd to /usr/local/include and delete any node and node_modules directory
* cd to ```/usr/local/bin``` and delete any ```node``` executable

You may also need to delete the following:
* ```/usr/local/bin/npm```
* ```/usr/local/share/man/man1/node.1```
* ```/usr/local/lib/dtrace/node.d```
* ```rm -rf $USER/.npm```

### Uninstalling Node.js

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


## Installing Ruby on Rails

### Installing Ruby

### Installing Rails

## Installing MySQL

## References
TOC generated by NPM [md-toc](https://www.npmjs.com/package/md-toc).
