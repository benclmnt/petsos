-- Create manual data here
INSERT INTO multiplier VALUES (5, 1.25), (4.5, 1.2), (4, 1.15), (3.5, 1.05);

INSERT INTO caretakers(ctuname, ct_type) VALUES
('po1', 'full-time'),
('po2', 'part-time'),
('po3', 'part-time'),
('po0', 'part-time');

INSERT into pet_categories(species, breed, size, base_price) VALUES
('dog', 'husky', 'large', 100),
('dog', 'golden retriever', 'large', 200),
('dog', 'alaskan malamute', 'large', 150),
('dog', 'samoyed', 'large', 230),
('dog', 'pug', 'medium', 350),
('dog', 'shiba inu', 'medium', 123),
('dog', 'cihuahua', 'small', 456),
('dog', 'pom', 'small', 50),
('cat', 'persian', 'medium', 100),
('cat', 'siamese', 'large', 475),
('cat', 'sphynx', 'small', 75),
('cat', 'sphynx', 'large', 225),
('cat', 'bengal', 'small', 75),
('cat', 'birman', 'medium', 125);

INSERT INTO is_capable(ctuname, species, breed, size) VALUES
('po0', 'dog', 'husky', 'large'),
('po0', 'dog', 'shiba inu', 'medium'),
('po0', 'cat', 'sphynx', 'small'),
('po0', 'cat', 'bengal', 'small'),
('po1', 'dog', 'husky', 'large'),
('po1', 'dog', 'cihuahua', 'small'),
('po1', 'dog', 'pug', 'medium'),
('po1', 'cat', 'persian', 'medium'),
('po2', 'dog', 'samoyed', 'large'),
('po2', 'cat', 'sphynx', 'large'),
('po3', 'dog', 'husky', 'large'),
('po3', 'cat', 'sphynx', 'large');

INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po1', '2020-10-25', '2021-03-30'), -- this is full time ct, we ensure 150 days between start and end date
('po0', '2020-01-01', '2021-01-20'), -- this is part time ct
('po2', '2020-01-01', '2021-01-20'),
('po3', '2021-01-04', '2021-01-28'),
('fct0', '2020-09-01', '2021-05-01'),
('fct1', '2020-09-01', '2021-05-01'),
('pct0', '2020-09-01', '2020-10-01'),
('fct0', '2020-10-02', '2021-10-02');

INSERT INTO pets(name, pouname, species, breed, size) VALUES
('jeff', 'po1', 'dog', 'husky', 'large'),
('drek', 'po0', 'cat', 'siamese', 'large'),
('uwu', 'po0', 'cat', 'bengal', 'small'),
('pet1po1', 'po1', 'dog', 'husky', 'large'),
('pet2po1', 'po1', 'cat', 'bengal', 'small'),
('pet1po2', 'po2', 'dog', 'samoyed', 'large'),
('pet2po2', 'po2', 'cat', 'persian', 'medium');

-- cannot directly insert review, rating. Bid should have is_win = false at first, then updated to true
INSERT INTO bid(payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname) VALUES
('cash', 'what', '2020-09-20', '2020-09-28', 'po0', 'po1', 'jeff'),
('cash', 'what', '2020-08-02', '2020-08-10', 'po2', 'po1', 'jeff'),
('cash', 'what', '2020-08-03', '2020-08-11', 'po3', 'po0', 'drek'),
('cash', 'what',  '2020-06-15', '2020-06-18', 'po3', 'po1', 'jeff'),
('credit', 'gojek', '2020-09-10', '2020-09-10', 'fct0', 'po1', 'pet1po1'),
('credit', 'gojek', '2020-09-11', '2020-09-12', 'pct0', 'po2', 'pet2po2'),
('credit', 'gojek', '2020-09-09', '2020-09-14', 'pct0', 'po1', 'pet2po1'),
('credit', 'gojek', '2020-10-10', '2020-10-15', 'fct0', 'po2', 'pet1po2'),
('credit', 'gojek', '2020-12-11', '2020-12-12', 'fct0', 'po1', 'pet1po1');

UPDATE bid SET rating = 3.9, review = 'This ct very nice one', is_win = true WHERE start_date = '2020-09-20' AND end_date = '2020-09-28' AND ctuname = 'po0' AND pouname = 'po1' AND petname = 'jeff';
UPDATE bid SET rating = 1, review = 'This ct very bad one', is_win = true WHERE start_date = '2020-08-02' AND end_date = '2020-08-10' AND ctuname = 'po2' AND pouname = 'po1' AND petname = 'jeff';
UPDATE bid SET rating = 1.5, review =  'This ct ok la', is_win = true WHERE start_date = '2020-08-03' AND end_date = '2020-08-11' AND ctuname = 'po3' AND pouname = 'po0' AND petname = 'drek';
UPDATE bid SET rating = 4.5, review = 'This ct not so bad', is_win = true WHERE start_date = '2020-06-15' AND end_date = '2020-06-18' AND ctuname = 'po3' AND pouname = 'po1' AND petname = 'jeff';
UPDATE bid SET is_win = true WHERE start_date = '2020-10-10' AND end_date = '2020-10-15' AND pouname = 'po2' AND petname = 'pet1po2';