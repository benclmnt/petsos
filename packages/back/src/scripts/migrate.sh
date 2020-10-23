#! /bin/bash

node seed
psql -d petsos -U florenciamartina -p 5432 -a -q -f ./migrate.sql

