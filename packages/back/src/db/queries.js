// User-related queries
export const getAllUsers = "SELECT * FROM users LIMIT 25;";
export const queryUserByUsername =
  "\
SELECT u.*, ct.ct_type, (ct.ctuname IS NOT NULL) as is_caretaker,\
(admin.username IS NOT NULL) as is_admin FROM users u\
  LEFT JOIN caretakers ct\
  ON u.username = ct.ctuname\
  LEFT JOIN pcs_admin admin\
  ON u.username = admin.username\
  WHERE u.username = $1;";
export const registerUser =
  "INSERT INTO users(username, email, password) VALUES ($1, $2, $3);";
export const deleteUser = "DELETE FROM users WHERE username = $1;";
export const editUser =
  "UPDATE users SET email = $2, address = $3, city = $4, country = $5, postal_code = $6, credit_card = $7 WHERE username = $1 RETURNING *";
export const addPetCategory =
  "INSERT INTO pet_categories(species, breed, size, base_price) VALUES ($1, $2, $3, $4);";
export const deletePetCategoryBySpeciesBreedSize =
  "DELETE FROM pet_categories WHERE species = $1 AND breed = $2 AND size = $3;";
export const updatePetCategory =
  "UPDATE pet_categories SET base_price = $4 WHERE species = $1 AND breed = $2 AND size = $3;";
export const queryPetCategories =
  "SELECT * FROM pet_categories ORDER by species;";
export const queryPetByName = "SELECT * FROM pets WHERE name = $1;";

// Pet owner related queries
export const queryPetByPouname = "SELECT * FROM pets WHERE pouname = $1;";
export const queryPetByPounameAndName =
  "SELECT * FROM pets WHERE pouname = $1 AND name = $2;";
export const addPet =
  "INSERT INTO pets(name, pouname, species, breed, size) VALUES ($1, $2, $3, $4, $5);";
export const updatePetInfo =
  "UPDATE pets SET species = $3, breed = $4, size = $5 WHERE name = $1 AND pouname = $2;";
export const deletePetByPounameAndName =
  "DELETE FROM pets WHERE pouname = $1 AND name = $2;";
export const queryOrders =
  "SELECT *, (start_date < date('now')) as is_past FROM bid WHERE pouname = $1 ORDER BY end_date DESC LIMIT 20;";
export const setRatingAndReview =
  "UPDATE bid SET rating = $5, review = $6 WHERE pouname = $1 AND petname = $2 AND start_date = $3 AND end_date = $4;";

// Caretaker-related queries
export const queryCaretakerByUsername =
  "SELECT c.*, r.avg_rating FROM caretakers c NATURAL LEFT JOIN ratings r WHERE ctuname = $1;";
export const editCaretakerType =
  "UPDATE caretakers SET ct_type = $2 WHERE ctuname = $1 RETURNING *";
export const queryBreedsBySpecies =
  "SELECT * FROM pet_categories WHERE species = $1;";
export const insertNewCaretaker =
  "INSERT INTO caretakers(ctuname, ct_type) VALUES ($1, $2);";
export const getAllCaretakers = "SELECT * FROM caretakers LIMIT 25;";
export const getCapability =
  "SELECT * FROM is_capable WHERE ctuname = $1 GROUP BY ctuname, species, breed, size;";
export const upsertCaretakerAvailability =
  "INSERT INTO availability_span(ctuname, start_date, end_date) VALUES ($1, $2, $3);";
export const deleteAvailabilities =
  "DELETE FROM availability_span WHERE ctuname = $1;";
export const getAvailability =
  "SELECT * FROM availability_span WHERE ctuname = $1;";
export const upsertCaretakerCapability =
  "INSERT INTO is_capable(species, breed, size, ctuname) VALUES ($1, $2, $3, $4);";
export const getAllCapabilities =
  "SELECT * FROM is_capable GROUP BY ctuname, species, breed, size;";
export const deleteCapabilities = "DELETE FROM is_capable WHERE ctuname = $1;";
export const listAllPetRequirementsQuery =
  "SELECT * FROM special_reqs WHERE pouname = $1 AND petname = $2;";
export const addPetSpecialRequirementsQuery =
  "INSERT INTO special_reqs(pouname, petname, description) VALUES ($1, $2, $3);";
export const deletePetSpecialRequirementsQuery =
  "DELETE FROM special_reqs WHERE pouname = $1 AND petname = $2;";
export const getPetSpecialRequirementsQuery =
  "SELECT description FROM special_reqs WHERE pouname = $1 AND petname = $2;";

// Queries to search caretakers
export const queryAllCaretakers =
  "SELECT * FROM caretakers C JOIN users U ON C.ctuname = U.username GROUP BY U.username, C.ctuname, U.address, U.city, U.country, U.postal_code;";
export const querySearchCaretakers =
  "SELECT ctuname, ct_type, city, country, postal_code, avg_rating, to_char(base_price * COALESCE((SELECT multiplier FROM multiplier WHERE a.avg_rating >= avg_rating ORDER BY multiplier DESC LIMIT 1), 1), 'FM999999999.00') AS price FROM all_ct a \
  WHERE start_date <= $1 AND end_date >= $2 \
  AND species = $3 AND breed = $4;";

export const getPetCategories = "SELECT * FROM pet_categories;";

//Queries for reviews
export const queryAllReviews =
  "SELECT rating, review, start_date, end_date, ctuname, pouname, petname \
  FROM bid B WHERE is_win = TRUE AND ctuname = $1 AND NOT (review is NULL AND rating is NULL) ORDER BY end_date DESC LIMIT $2;";

// Queries for jobs
export const queryOverlap =
  "WITH filtered_bid (price, payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname) AS (\
	SELECT b.price, b.payment_method, b.transfer_method, b.start_date, b.end_date, b.ctuname, b.pouname, b.petname\
	FROM bid b\
	WHERE b.ctuname = $1 and b.is_win AND not isempty(daterange($2, $3, '[]') * daterange(b.start_date, b.end_date, '[]')))\
	SELECT DISTINCT fb1.price, fb1.payment_method, fb1.transfer_method, fb1.start_date, fb1.end_date, fb1.ctuname, fb1.pouname, fb1.petname\
	FROM filtered_bid fb1, filtered_bid fb2, filtered_bid fb3, filtered_bid fb4, filtered_bid fb5\
	WHERE NOT isempty(daterange(fb1.start_date, fb1.end_date, '[]')\
	* daterange(fb2.start_date, fb2.end_date, '[]')\
	* (CASE WHEN (SELECT AVG(rating) FROM bid WHERE is_win AND ctuname = $1) IS NULL OR\
		(SELECT AVG(rating) FROM bid WHERE is_win AND ctuname = $1) < 4\
	THEN daterange('-infinity', 'infinity')\
	ELSE daterange(fb3.start_date, fb3.end_date, '[]')\
	* daterange(fb4.start_date, fb4.end_date, '[]')\
	* daterange(fb5.start_date, fb5.end_date, '[]') END)\
	* daterange($2, $3, '[]'))\
	AND (CASE WHEN (SELECT AVG(rating) FROM bid WHERE is_win AND ctuname = 'po1') IS NULL OR (SELECT AVG(rating) FROM bid WHERE is_win AND ctuname = 'po1') < 4 THEN (fb1.pouname <> fb2.pouname OR fb1.petname <> fb2.petname OR fb1.start_date <> fb2.start_date OR fb1.end_date <> fb2.end_date) ELSE (\
	(fb1.pouname <> fb2.pouname OR fb1.petname <> fb2.petname OR fb1.start_date <> fb2.start_date OR fb1.end_date <> fb2.end_date) AND \
	(fb1.pouname <> fb3.pouname OR fb1.petname <> fb3.petname OR fb1.start_date <> fb3.start_date OR fb1.end_date <> fb3.end_date) AND \
	(fb1.pouname <> fb4.pouname OR fb1.petname <> fb4.petname OR fb1.start_date <> fb4.start_date OR fb1.end_date <> fb4.end_date) AND \
	(fb1.pouname <> fb5.pouname OR fb1.petname <> fb5.petname OR fb1.start_date <> fb5.start_date OR fb1.end_date <> fb5.end_date) AND \
	(fb2.pouname <> fb3.pouname OR fb2.petname <> fb3.petname OR fb2.start_date <> fb3.start_date OR fb2.end_date <> fb3.end_date) AND \
	(fb2.pouname <> fb4.pouname OR fb2.petname <> fb4.petname OR fb2.start_date <> fb4.start_date OR fb2.end_date <> fb4.end_date) AND \
	(fb2.pouname <> fb5.pouname OR fb2.petname <> fb5.petname OR fb2.start_date <> fb5.start_date OR fb2.end_date <> fb5.end_date) AND \
	(fb3.pouname <> fb4.pouname OR fb3.petname <> fb4.petname OR fb3.start_date <> fb4.start_date OR fb3.end_date <> fb4.end_date) AND \
	(fb3.pouname <> fb5.pouname OR fb3.petname <> fb5.petname OR fb3.start_date <> fb5.start_date OR fb3.end_date <> fb5.end_date) AND \
	(fb4.pouname <> fb5.pouname OR fb4.petname <> fb5.petname OR fb4.start_date <> fb5.start_date OR fb4.end_date <> fb5.end_date)\
	) END);";
/* There exists a race condition for pgsql since the insert and select clauses are run concurrently,
 * so the insert may complete when another bid has already won.
 * May consider switching to ON CONFLICT on conditional, although no clear documentation exists on syntax.
 */
export const addBid =
  "INSERT INTO bid (price, payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname)\
	SELECT CAST($1 AS NUMERIC), $2, $3, $4, $5, $6, CAST($7 AS VARCHAR), CAST($8 AS VARCHAR)\
	WHERE NOT EXISTS(SELECT * FROM bid WHERE daterange($3, $4, '[]') * daterange(start_date, end_date, '[]') IS NOT NULL AND pouname = CAST($7 AS VARCHAR) AND petname=CAST($8 AS VARCHAR) AND is_win);";
export const winBid =
  "UPDATE bid SET is_win = true WHERE pouname = $1 AND petname = $2 AND start_date = $3 AND end_date = $4 AND ctuname = $5\
	AND NOT EXISTS(SELECT * FROM bid WHERE daterange($3, $4, '[]') * daterange(start_date, end_date, '[]') IS NOT NULL AND pouname=$1 AND petname=$2 AND is_win)\
	RETURNING *;";
export const getActiveBidsForCt =
  "SELECT * FROM bid WHERE ctuname = $1 AND start_date > CURRENT_DATE AND NOT is_win;";
export const removeBid =
  "DELETE FROM bid WHERE ctuname = $1 AND start_date = $2 AND end_date = $3 AND pouname = $4 AND petname = $5;";
export const getUpcomingJobs =
  "SELECT * FROM bid WHERE ctuname = $1 AND end_date > CURRENT_DATE AND is_win;";
// low priority TODO: RETURNING *
export const unwinBid =
  "UPDATE bid SET is_win = false WHERE pouname = $1 AND petname = $2 AND start_date = $3 AND end_date = $4 AND ctuname = $5;";

export const updateRating =
  "UPDATE bid SET rating = $6 WHERE pouname = $1 AND petname = $2 AND start_date = $3 AND end_date = $4 AND ctuname = $5 RETURNING *;";

// admin insights queries
export const petsTakenCareOf =
  "SELECT COUNT(DISTINCT (petname, pouname)) FROM (SELECT petname, pouname, COUNT(*) as freq FROM bid WHERE is_win \
= true AND date('now') - start_date <= 90 AND start_date <= date('now') GROUP BY pouname, petname) as t;";
export const petsCareFrequency =
  "SELECT pouname, COUNT(*) as freq FROM bid WHERE is_win = true AND date('now') - start_date <= 90 AND \
start_date <= date('now') GROUP BY pouname;";
export const allCaretakerInsightQuery =
  "SELECT ctuname, SUM(price) as raw_payout, COUNT(*) as num_jobs, SUM(end_date - start_date + 1) as pet_days, to_char(start_date, 'Mon') as mon, extract(year from start_date) as yyyy \
    FROM bid b WHERE is_win = true GROUP BY ctuname, mon, yyyy "; // don't add semicolon here. I'm concatenating it with another string. See caretakers.js (getCaretakerByUsername)

export const getPayout =
  "SELECT *, CASE when ct_type = 'full-time' then (3000 + raw_payout / pet_days * GREATEST(0, pet_days - 60) * 0.8) else (raw_payout * 0.75) end AS total_payout \
  FROM (" +
  allCaretakerInsightQuery +
  ", start_date, end_date HAVING ctuname = $1 AND end_date <= date('now') AND start_date >= date('now') - interval '1 month' ) AS tmp NATURAL JOIN caretakers;";
