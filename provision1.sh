#!/bin/bash
apt-get update
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs

apt-get --no-install-recommends -y install build-essential pkg-config erlang libicu-dev libmozjs185-dev libcurl4-openssl-dev
wget http://apache.rediris.es/couchdb/source/2.0.0/apache-couchdb-2.0.0.tar.gz -P /tmp
tar -xvzf /tmp/apache-couchdb-2.0.0.tar.gz -C /tmp
cd /tmp/apache-couchdb-2.0.0
./configure
make release
adduser --system \
		--shell /bin/bash \
		--group --gecos \
		"CouchDB Administrator" couchdb
cp -R /tmp/apache-couchdb-2.0.0/rel/couchdb /home/couchdb
chown -R couchdb:couchdb /home/couchdb
find /home/couchdb/couchdb -type d -exec chmod 0770 {} \;
find /home/couchdb/couchdb/etc -type f -exec chmod 0644 {} \;
sed -i "/\[httpd\]/abind_address = 0.0.0.0" /home/couchdb/couchdb/etc/local.ini
sed -i "/\[chttpd\]/abind_address = 0.0.0.0" /home/couchdb/couchdb/etc/local.ini
sed -i -e 's/writer = stderr/writer = file/g' /home/couchdb/couchdb/etc/default.ini
echo "[log]" >> /home/couchdb/couchdb/etc/local.ini
echo "file = /home/couchdb/couchdb/couchdb.log" >> /home/couchdb/couchdb/etc/local.ini