# Getting started
## Development VM
The host machine will need vagrant to be installed.
To get the code running for debugging:
* `cd` into the top level directory of where this repo is checked out
* `vagrant up`
* `vagrant ssh`
* `cd code`
* `npm run nodemon` (for debugging)
* OR `npm start` (for running)

You can now attach on `localhost:5858` to debug the code.

## Editing the code
Editing the code can be done in your favourite editor.

## Debugging the code
Debugging the code is easiest in Google Chrome:
* Go to chrome://inspect/#devices
* Make sure `Discover network targets` is ticked, and click Configure to add `localhost:5858` as a target
* Click `Open dedicated DevTools for Node`

Now whenever you make a change to any of the files, `nodemon` will restart the server, and after a few seconds Chrome developer tools will automatically reconnect to the process.
