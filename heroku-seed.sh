#! /usr/bin/bash
node packages/back/src/scripts/seed.js
mv packages/back/src/scripts/migrate.sql .
cat migrate.sql | heroku pg:psql postgresql-concave-65309 --app cs2102-petsos
rm migrate.sql
