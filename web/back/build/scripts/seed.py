import sys
import random
from datetime import date, timedelta
from os import path

FILE =  path.join(path.dirname(__file__), "migrate.sql") if len(sys.argv) < 5 else sys.argv[4]
DDL = path.join(path.dirname(__file__), "init.sql")
CUSTOM_DATA = path.join(path.dirname(__file__), "data.sql")

PO_NUMBER = 10
FCT_NUMBER = 2
PCT_NUMBER = 2
WIN_BID_PERCENTAGE = 0.4

if len(sys.argv) > 3:
    PO_NUMBER = int(sys.argv[1])
    FCT_NUMBER = int(sys.argv[2])
    PCT_NUMBER = int(sys.argv[3])

pet_categories = [
('dog', 'husky', 'small', 60),
('dog', 'husky', 'medium', 80),
('dog', 'husky', 'large', 100),
('dog', 'retriever', 'small', 90),
('dog', 'retriever', 'medium', 100),
('dog', 'retriever', 'large', 110),
('dog', 'pug', 'small', 70),
('dog', 'pug', 'medium', 75),
('dog', 'pug', 'large', 90),
('dog', 'cihuahua', 'small', 40),
('dog', 'cihuahua', 'medium', 56),
('dog', 'cihuahua', 'large', 79),
('cat', 'persian', 'small', 50),
('cat', 'persian', 'medium', 60),
('cat', 'persian', 'large', 70),
('cat', 'sphynx', 'medium', 25),
('cat', 'sphynx', 'small', 50),
('cat', 'sphynx', 'large', 75),
('cat', 'siamese', 'small', 50),
('cat', 'siamese', 'medium', 100),
('cat', 'siamese', 'large', 125)
]

reviews = ['This ct very nice one', 'This ct very bad one', 'This ct ok la', 'This ct not so bad']
payment_methods = ['cash', 'credit']
transfer_methods = ['delivery', 'take', 'grab']

with open(FILE, 'w') as out:
    with open(DDL, 'r') as f:
        for line in f:
            out.write(line)

    out.write("INSERT INTO multiplier VALUES (5, 1.25), (4.5, 1.2), (4, 1.15), (3.5, 1.05);\n\n")

    out.write("INSERT into pet_categories(species, breed, size, base_price) VALUES ")
    out.write(", ".join("(" + ", ".join("'" + str(x) + "'" for x in pc) + ")" for pc in pet_categories))
    out.write(";\n\n")

    out.write("-- pet owners\n")

    out.write("INSERT into users (email, username, password, address, city, country, postal_code) VALUES ")
    for i in range(PO_NUMBER - 1):
        out.write(f"('po{i}@petsos.com', 'po{i}', 'po{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    out.write(f"('po{PO_NUMBER}@petsos.com', 'po{PO_NUMBER}', 'po{PO_NUMBER}', 'Haji Lane {PO_NUMBER}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)});\n\n")

    out.write("-- pets\n")

    out.write("INSERT INTO pets(name, pouname, species, breed, size) VALUES ")
    for i in range(PO_NUMBER - 1):
        for j in range(random.randint(0, 3)):
            pet_category = random.choice(pet_categories)
            out.write(f"('po{i}pet{j}', 'po{i}', '{pet_category[0]}', '{pet_category[1]}', '{pet_category[2]}'),\n")

    out.write(f"('po0pet4', 'po0', 'dog', 'husky', 'small');\n\n")

    out.write("-- caretakers\n")

    out.write("INSERT into users (email, username, password, address, city, country, postal_code) VALUES ")
    for i in range(FCT_NUMBER - 1):
        out.write(f"('fct{i}@petsos.com', 'fct{i}', 'fct{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    out.write(f"('fct{FCT_NUMBER}@petsos.com', 'fct{FCT_NUMBER}', 'fct{FCT_NUMBER}', 'Haji Lane {FCT_NUMBER}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)});\n\n")

    out.write(f"INSERT into caretakers(ctuname, ct_type) VALUES ")
    for i in range(FCT_NUMBER - 1):
        out.write(f"('fct{i}', 'full-time'), \n")

    out.write(f"('fct{FCT_NUMBER}', 'full-time');\n\n")

    out.write("INSERT INTO availability_span(ctuname, start_date, end_date) VALUES ")
    for i in range(FCT_NUMBER - 1):
        start_date = date.today() + timedelta(days = random.randint(-90, 0))
        end_date = start_date + timedelta(days = random.randint(150, 365))
        out.write(f"('fct{i}', '{start_date.isoformat()}', '{end_date.isoformat()}'),\n")

    start_date = date.today() + timedelta(days = random.randint(-90, 0))
    end_date = start_date + timedelta(days = random.randint(150, 365))
    out.write(f"('fct{FCT_NUMBER}', '{start_date.isoformat()}', '{end_date.isoformat()}');\n\n")

    out.write("INSERT INTO is_capable(ctuname, species, breed, size) VALUES ")
    for i in range(FCT_NUMBER - 1):
        for j in range(random.randint(0, int(len(pet_categories) / 3))):
            out.write(f"('fct{i}', '{pet_categories[j][0]}', '{pet_categories[j][1]}', '{pet_categories[j][2]}'),\n")

    out.write(f"('fct{FCT_NUMBER}', 'dog', 'husky', 'small');\n\n")

    # same as above code, just for pct_number

    out.write("INSERT into users (email, username, password, address, city, country, postal_code) VALUES ")
    for i in range(PCT_NUMBER - 1):
        out.write(f"('pct{i}@petsos.com', 'pct{i}', 'pct{i}', 'Haji Lane {i}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)}),\n")

    out.write(f"('pct{PCT_NUMBER}@petsos.com', 'pct{PCT_NUMBER}', 'pct{PCT_NUMBER}', 'Haji Lane {PCT_NUMBER}', 'Singapore', 'Singapore', {random.randint(10000, 10000 + PO_NUMBER)});\n\n")

    out.write(f"INSERT into caretakers(ctuname, ct_type) VALUES ")
    for i in range(PCT_NUMBER - 1):
        out.write(f"('pct{i}', 'full-time'), \n")

    out.write(f"('pct{PCT_NUMBER}', 'full-time');\n\n")

    out.write("INSERT INTO availability_span(ctuname, start_date, end_date) VALUES ")
    for i in range(PCT_NUMBER - 1):
        start_date = date.today() + timedelta(days = random.randint(-90, 0))
        end_date = start_date + timedelta(days = random.randint(150, 365))
        out.write(f"('pct{i}', '{start_date.isoformat()}', '{end_date.isoformat()}'),\n")

    start_date = date.today() + timedelta(days = random.randint(-90, 0))
    end_date = start_date + timedelta(days = random.randint(150, 365))
    out.write(f"('pct{PCT_NUMBER}', '{start_date.isoformat()}', '{end_date.isoformat()}');\n\n")

    out.write("INSERT INTO is_capable(ctuname, species, breed, size) VALUES ")
    for i in range(PCT_NUMBER - 1):
        for j in range(random.randint(0, int(len(pet_categories) / 3))):
            out.write(f"('pct{i}', '{pet_categories[j][0]}', '{pet_categories[j][1]}', '{pet_categories[j][2]}'),\n")

    out.write(f"('pct{PCT_NUMBER}', 'dog', 'husky', 'small');\n\n")

    # admin
    out.write("INSERT into users (email, username, password, address, city, country, postal_code) VALUES ('admin@petsos.com', 'admin', 'admin', 'Haji Lane 8', 'Singapore', 'Singapore', 19999);\n\n")

    out.write("INSERT INTO pcs_admin(username) VALUES ('admin');\n\n");

    for i in range(PO_NUMBER * 2):
        bid_rand = random.random()
        bid_rating = round(random.random() * 3 + 2, 1)
        bid_po = random.randrange(0, PO_NUMBER)

        if (bid_rand < WIN_BID_PERCENTAGE) :
            start_date = date.today() + timedelta(days = random.randint(-60, -10))
            end_date = start_date + timedelta(days = random.randint(1, 14))
            out.write("INSERT INTO bid(payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname, rating, review, is_win) VALUES ")
            out.write(f"""('{random.choice(payment_methods)}', '{random.choice(transfer_methods)}', '{start_date.isoformat()}', '{end_date.isoformat()}',
                '{("p" if bid_rand < (WIN_BID_PERCENTAGE / 2) else "f")}ct{random.randrange(0, PCT_NUMBER)}', 'po{bid_po}', 'po{bid_po}pet{random.randint(0, 2)}', {bid_rating}, '{random.choice(reviews)}', true);\n""")
        else:
            start_date = date.today() + timedelta(days = random.randint(-90, 90))
            end_date = start_date + timedelta(days = random.randint(1, 14))
            out.write("INSERT INTO bid(payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname) VALUES ")
            out.write(f"""('{random.choice(payment_methods)}', '{random.choice(transfer_methods)}', '{start_date.isoformat()}', '{end_date.isoformat()}',
                '{("p" if bid_rand < (1 - WIN_BID_PERCENTAGE) / 2 else "f")}ct{random.randrange(0, PCT_NUMBER)}', 'po{bid_po}', 'po{bid_po}pet{random.randint(0, 2)}');\n""")

    with open(CUSTOM_DATA, 'r') as f:
        for line in f:
            out.write(line)
