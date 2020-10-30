-- Create manual data here
INSERT into users (email, username, password) VALUES
('test@petsos.com', 'test', 'test');
INSERT into users (email, username, password) VALUES
('drake@test.com', 'drake251200', 'rahasia');
INSERT into pets (name, pouname, species, breed, size) VALUES
('Jancoek', 'drake251200', 'dog', 'husky', 'big');
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
INSERT INTO caretakers(ctuname, ct_type) VALUES
('po0', 'part-time');
INSERT INTO bid(rating, price, payment_method, transfer_method, start_date, end_date, 
ctuname, pouname, petname, is_win, review) VALUES (1, 50, 'whatever', 'what',
'2020-08-02', '2020-08-10', 'fct0', 'drake251200', 'Jancoek', true, 'This ct very bad one');
INSERT INTO bid(price, payment_method, transfer_method, start_date, end_date, 
ctuname, pouname, petname, is_win) VALUES (50, 'whatever', 'what',
'2020-09-02', '2020-09-10', 'fct0', 'drake251200', 'Jancoek', true);