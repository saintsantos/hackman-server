# hackman-server
Server for hackman hackathon management application

# Installation for mongo

Since we're all installing on mac and linux, I will add the instructions for both

### For Mac:
run:

    brew install mongodb

### For Linux:
Arch users run:

    sudo pacman -Sy mongodb

Debian/Ubuntu users follow the steps outlined here: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# Start mongo

### Mac
first create a directory /data/db and run:

    mongod

### Linux
start mongodb service using the command

    sudo service mongod start

then you can check on the database at any time by running

    mongo

from the terminal.

# Migrate the database
The scripts under database in this repo will run the mongorestore and mongodump based on the scripts you call. Make sure to change the directory that you cloned the repo to in order to make sure the process goes through smoothly.

# Start the database
Once mongodb is installed and running we're ready to go! Run the command

    npm start

from the /server directory and the server should start. Any issues you can just bug me on slack about.
