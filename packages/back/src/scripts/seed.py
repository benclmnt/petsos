import sys
import random
from os import path

FILE =  path.join(path.dirname(__file__), "migrate.sql") if len(sys.argv) < 2 else sys.argv[1]
DDL = path.join(path.dirname(__file__), "init.sql")
CUSTOM_DATA = path.join(path.dirname(__file__), "data.sql")

PO_NUMBER = 10;
FCT_NUMBER = 2;
PCT_NUMBER = 2;

with open(FILE, 'w') as out:
    with open(DDL, 'r') as f:
        for line in f:
            out.write(line)

    print("...generating users data")
    out.write("INSERT into users (email, username, password, address, city, country, postal_code) VALUES\n")

    for i in range(PO_NUMBER):
        out.write(f"('po{i}@petsos.com', 'po{i}', 'po{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    for i in range(FCT_NUMBER):
        out.write(f"('fct{i}@petsos.com', 'fct{i}', 'fct{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    for i in range(PCT_NUMBER):
        out.write(f"('pct{i}@petsos.com', 'pct{i}', 'pct{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    out.write("('admin@petsos.com', 'admin', 'admin', 'Haji Lane 8', 'Singapore', 'Singapore', 19999);\n\n")
    out.write("INSERT into caretakers(username, ct_type) VALUES\n")

    for i in range(FCT_NUMBER):
        out.write(f"('fct{i}', 'full-time'),\n")

    for i in range(PCT_NUMBER - 1):
        out.write(f"('pct{i}', 'part-time'),\n")

    out.write(f"('pct{PCT_NUMBER - 1}', 'part-time');\n\n");

    out.write("INSERT INTO pcs_admin(username) VALUES ('admin');\n\n");

    with open(CUSTOM_DATA, 'r') as f:
        for line in f:
            out.write(line)
