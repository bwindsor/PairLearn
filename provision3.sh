#!/bin/bash
curl -X PUT http://127.0.0.1:5984/_users
curl -X PUT http://127.0.0.1:5984/_replicator
curl -X PUT http://127.0.0.1:5984/_global_changes
curl -X PUT http://127.0.0.1:5986/_config/admins/couchadmin -d '"couch-admin-123"'