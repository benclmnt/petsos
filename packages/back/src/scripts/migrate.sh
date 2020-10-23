node seed
psql -d petsos -U erinmayg -p 5432 -a -q -f ./migrate.sql
