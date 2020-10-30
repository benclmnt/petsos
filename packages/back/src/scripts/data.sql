-- Create manual data here
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po1', '3.5', 'full-time');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po2', '4.5', 'part-time');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po3', '3', 'part-time');
INSERT INTO caretakers(ctuname, ct_type) VALUES
('po0', 'part-time');

INSERT into pet_categories(species, breed, size) VALUES
('dog', 'husky', 'big');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'golden retriever', 'big');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'alaskan malamute', 'big');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'samoyed', 'big');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'pug', 'medium');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'shiba inu', 'medium');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'cihuahua', 'small');
INSERT into pet_categories(species, breed, size) VALUES
('dog', 'pom', 'small');
INSERT into pet_categories(species, breed, size) VALUES
('cat', 'persian', 'medium');
INSERT into pet_categories(species, breed, size) VALUES
('cat', 'siamese', 'big');
INSERT into pet_categories(species, breed, size) VALUES
('cat', 'sphynx', 'small');
INSERT into pet_categories(species, breed, size) VALUES
('cat', 'bengal', 'small');
INSERT into pet_categories(species, breed, size) VALUES
('cat', 'birman', 'medium');

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
('po0', '2020-10-26', '2020-10-31'); -- this is part time ct
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po2', '2020-10-23', '2020-10-28');
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po3', '2020-10-24', '2020-10-28');

INSERT INTO pets(name, pouname, species, breed, size) VALUES
('jeff', 'po1', 'dog', 'shiba inu', 'small');
INSERT INTO pets(name, pouname, species, breed, size) VALUES
('drek', 'po0', 'cat', 'bengal', 'big');

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


