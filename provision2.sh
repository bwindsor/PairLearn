#!/bin/bash
sudo -i -u couchdb couchdb/bin/couchdb &
livereload /home/vagrant/code &
sleep 5