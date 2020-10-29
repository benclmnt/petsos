-- Create manual data here
INSERT into users (email, username, password) VALUES
('test@petsos.com', 'test', 'test');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po1', '3.5', 'full-time');
INSERT INTO caretakers(ctuname, avg_rating, ct_type) VALUES
('po2', '4.5', 'part-time');
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
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po0', 'dog', 'husky', 'big');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po0', 'dog', 'shiba inu', 'medium');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po0', 'cat', 'sphynx', 'small');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po0', 'cat', 'bengal', 'small');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po1', 'dog', 'cihuahua', 'small');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po1', 'dog', 'pug', 'medium');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po1', 'cat', 'persian', 'medium');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po2', 'dog', 'samoyed', 'big');
INSERT INTO is_capable(ctuname, pc_species, pc_breed, pc_size) VALUES 
('po2', 'cat', 'siamese', 'big');
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po1', '2020-10-25', '2020-10-30');
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po0', '2020-10-26', '2020-10-31');
INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
('po2', '2020-10-23', '2020-10-28');
