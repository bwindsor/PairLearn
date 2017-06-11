This is the backend for [PairLearnApp](https://github.com/bwindsor/PairLearnApp).
Currently very incomplete, so far this has mostly been teaching me how to set up development infrastructure (vagrant, chrome debugger, live reload, npm, nodemon, couchdb)

# Getting started
## Development VM
The host machine will need vagrant to be installed.
To get the code running for debugging:
* `cd` into the top level directory of where this repo is checked out
* `vagrant up`
* `vagrant ssh`
* `cd code`
* `npm run start-dev` (for debugging)
* OR `npm start` (for running)

You can now attach on `localhost:5858` to debug the code.

## Editing the code
Editing the code can be done in your favourite editor.

## Debugging the code
Debugging the code is easiest in Google Chrome:
### Nodejs code
* Go to [chrome://inspect/#devices]
* Make sure `Discover network targets` is ticked, and click Configure to add `localhost:5858` as a target
* Click `Open dedicated DevTools for Node`
### Viewing the page
* Download the livereload Chrome extension from [http://livereload.com/extensions/]
* Livereload is already running on the vagrant machine - navigate to localhost:8080 and click the livereload icon to enable livereload for the page. Then the page should refresh whenever you modify the backend.

Now whenever you make a change to any of the files, `nodemon` will restart the server, and after a few seconds Chrome developer tools will automatically reconnect to the process.
### CouchDB admin interface
You can view the database through a Ui at `localhost:5984/_utils`. Log in with the username and password which are specified in the Vagrantfile (currently couchadmin and couch-admin-123).

# API
There are a few API routes implemented here which require admin access to the database (namely creating and removing users). After this, users can query their database directly using the couchDB API. These are on the port which Express is listening on.
`POST /user/:username` adds a user
`PUT /user/:username` allows a password to be updated
`DELETE /user/:username` deletes a user
Thereafter operations can be called using the CouchDB API on the database. These are on the port which CouchDB is listening on.
`GET /dbname` gets information about the user's database. These requests need simple authentication. HTTP is currently used so passwords are sent unencrypted though.