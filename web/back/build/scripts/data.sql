-- Create manual data here

-- INSERT INTO caretakers(ctuname, ct_type) VALUES
-- ('po1', 'full-time'),
-- ('po2', 'part-time'),
-- ('po3', 'part-time'),
-- ('po0', 'part-time');

-- INSERT INTO is_capable(ctuname, species, breed, size) VALUES
-- ('po0', 'dog', 'husky', 'large'),
-- ('po0', 'dog', 'shiba inu', 'medium'),
-- ('po0', 'cat', 'sphynx', 'small'),
-- ('po0', 'cat', 'bengal', 'small'),
-- ('po1', 'dog', 'husky', 'large'),
-- ('po1', 'dog', 'cihuahua', 'small'),
-- ('po1', 'dog', 'pug', 'medium'),
-- ('po1', 'cat', 'persian', 'medium'),
-- ('po2', 'dog', 'samoyed', 'large'),
-- ('po2', 'cat', 'sphynx', 'large'),
-- ('po3', 'dog', 'husky', 'large'),
-- ('po3', 'cat', 'sphynx', 'large');

-- INSERT INTO availability_span(ctuname, start_date, end_date) VALUES
-- ('po1', '2020-10-25', '2021-03-30'), -- this is full time ct, we ensure 150 days between start and end date
-- ('po0', '2020-01-01', '2021-01-20'), -- this is part time ct
-- ('po2', '2020-01-01', '2021-01-20'),
-- ('po3', '2021-01-04', '2021-01-28'),
-- ('pct0', '2020-09-01', '2020-10-01'),

-- INSERT INTO pets(name, pouname, species, breed, size) VALUES
-- ('jeff', 'po1', 'dog', 'husky', 'large'),
-- ('drek', 'po0', 'cat', 'siamese', 'large'),
-- ('uwu', 'po0', 'cat', 'bengal', 'small'),


-- cannot directly insert review, rating. Bid should have is_win = false at first, then updated to true
-- INSERT INTO bid(payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname) VALUES
-- ('cash', 'what', '2020-09-20', '2020-09-28', 'po0', 'po1', 'jeff'),
-- ('cash', 'what', '2020-08-02', '2020-08-10', 'po2', 'po1', 'jeff'),
-- ('cash', 'what', '2020-08-03', '2020-08-11', 'po3', 'po0', 'drek'),
-- ('cash', 'what',  '2020-06-15', '2020-06-18', 'po3', 'po1', 'jeff'),

-- UPDATE bid SET rating = 3.9, review = 'This ct very nice one', is_win = true WHERE start_date = '2020-09-20' AND end_date = '2020-09-28' AND ctuname = 'po0' AND pouname = 'po1' AND petname = 'jeff';
-- UPDATE bid SET rating = 1, review = 'This ct very bad one', is_win = true WHERE start_date = '2020-08-02' AND end_date = '2020-08-10' AND ctuname = 'po2' AND pouname = 'po1' AND petname = 'jeff';
-- UPDATE bid SET rating = 1.5, review =  'This ct ok la', is_win = true WHERE start_date = '2020-08-03' AND end_date = '2020-08-11' AND ctuname = 'po3' AND pouname = 'po0' AND petname = 'drek';
-- UPDATE bid SET rating = 4.5, review = 'This ct not so bad', is_win = true WHERE start_date = '2020-06-15' AND end_date = '2020-06-18' AND ctuname = 'po3' AND pouname = 'po1' AND petname = 'jeff';