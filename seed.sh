#! /usr/bin/bash
python3 packages/back/src/scripts/seed.py 800 100 100
psql -h localhost -d petsos -U clement -p 5432 -a -q -f packages/back/src/scripts/migrate.sql
# cat packages/back/src/scripts/migrate.sql | heroku pg:psql postgresql-concave-65309 --app cs2102-petsos
