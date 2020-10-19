# Api-DEV

## .env file

```
PG_PORT=5432
PG_USER=clement
PG_PASSWORD=clement
PG_DB=petsos

PG_HOST=localhost
PORT=5000

DATABASE_URL=postgresql://clement:clement@localhost:5432/petsos
```

## DB DDL

Our DB ddl is located at `src/scripts/init.sql`. Edit this if you wanna create
new table, insert dummy values etc.

To update your database, run `yarn migrate`. 
If you don't see any error, then you are good to go.

## DB Queries

All DB queries are stored at `src/db/queries.js`.

