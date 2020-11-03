-- Create manual data here
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po1', '3.5', 'full-time');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po2', '4.5', 'part-time');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po3', '3', 'part-time');
INSERT INTO caretakers(ctuname, ct_type) VALUES
('po0', 'part-time');

INSERT into pet_categories(species, breed, size, base_price) VALUES
('dog', 'husky', 'big', 100),
('dog', 'golden retriever', 'big', 200),
('dog', 'alaskan malamute', 'big', 150),
('dog', 'samoyed', 'big', 230),
('dog', 'pug', 'medium', 350),
('dog', 'shiba inu', 'medium', 123),
('dog', 'cihuahua', 'small', 456),
('dog', 'pom', 'small', 50),
('cat', 'persian', 'medium', 100),
('cat', 'siamese', 'big', 475),
('cat', 'sphynx', 'small', 75),
<<<<<<< HEAD
('cat', 'sphynx', 'big', 75),
=======
>>>>>>> f438ded5193b091f4c584b1c886df0f365fb7925
('cat', 'bengal', 'small', 75),
('cat', 'birman', 'medium', 125);

INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po0', 'dog', 'husky', 'big');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po0', 'dog', 'shiba inu', 'medium');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po0', 'cat', 'sphynx', 'small');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po0', 'cat', 'bengal', 'small');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po1', 'dog', 'cihuahua', 'small');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po1', 'dog', 'pug', 'medium');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po1', 'cat', 'persian', 'medium');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po2', 'dog', 'samoyed', 'big');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po2', 'cat', 'sphynx', 'big');
INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po3', 'cat', 'sphynx', 'big');

INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po1', '2020-10-25', '2021-03-30'); -- this is full time ct, we ensure 150 days between start and end date
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po0', '2021-01-01', '2021-01-20'); -- this is part time ct
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po2', '2021-01-01', '2021-01-20');
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po3', '2021-01-04', '2021-01-28');

INSERT INTO pets(name, pouname, species, breed, size) VALUES
('jeff', 'po1', 'dog', 'husky', 'big');
INSERT INTO pets(name, pouname, species, breed, size) VALUES
('drek', 'po0', 'cat', 'siamese', 'big');
INSERT INTO pets(name, pouname, species, breed, size) VALUES
('uwu', 'po0', 'cat', 'bengal', 'small');

INSERT INTO bid(rating, price, payment_method, transfer_method, review, start_date, end_date,
ctuname, pouname, petname, is_win) VALUES (3.9, 50, 'whatever', 'what', 'This ct very nice one',
'2020-09-20', '2020-09-28', 'po0', 'po1', 'jeff', true);
INSERT INTO bid(rating, price, payment_method, transfer_method, review, start_date, end_date,
ctuname, pouname, petname, is_win) VALUES (1, 50, 'whatever', 'what', 'This ct very bad one',
'2020-08-02', '2020-08-10', 'po2', 'po1', 'jeff', true);
INSERT INTO bid(rating, price, payment_method, transfer_method, review, start_date, end_date,
ctuname, pouname, petname, is_win) VALUES (1.5, 50, 'whatever', 'what', 'This ct ok la',
'2020-08-03', '2020-08-11', 'po3', 'po0', 'drek', true);
INSERT INTO bid(rating, price, payment_method, transfer_method, review, start_date, end_date,
ctuname, pouname, petname, is_win) VALUES (4.5, 50, 'whatever', 'what', 'This ct not so bad',
'2020-06-15', '2020-06-18', 'po3', 'po1', 'jeff', true);

INSERT INTO pets(name, pouname, species, breed, size) VALUES
('pet1po1', 'po1', 'dog', 'husky', 'big'),
('pet2po1', 'po1', 'cat', 'bengal', 'small'),
('pet1po2', 'po2', 'dog', 'samoyed', 'big'),
('pet2po2', 'po2', 'cat', 'persian', 'medium');

INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('fct0', '2020-09-01', '2021-05-01'),
('fct1', '2020-09-01', '2021-05-01'),
('pct0', '2020-09-01', '2020-10-01'),
('fct0', '2020-10-02', '2021-10-02');

INSERT INTO bid(price, payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname, is_win) VALUES
(100, 'credit', 'gojek', '2020-09-10', '2020-09-10', 'fct0', 'po1', 'pet1po1', true),
(100, 'credit', 'gojek', '2020-09-11', '2020-09-12', 'pct0', 'po2', 'pet2po2', true),
(100, 'credit', 'gojek', '2020-09-09', '2020-09-14', 'pct0', 'po1', 'pet2po1', false),
(100, 'credit', 'gojek', '2020-10-10', '2020-10-15', 'fct0', 'po2', 'pet1po2', true),
(100, 'credit', 'gojek', '2020-12-11', '2020-12-12', 'fct0', 'po1', 'pet1po1', true);

