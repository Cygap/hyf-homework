USE Meal_sharing;

-- Meal
-- Queries to write
-- Get all meals
SELECT
  *
FROM
  `Meal`;

-- Add a new meal
INSERT INTO
  Meal (
    id,
    title,
    description,
    location,
    Meal.when,
    price,
    max_reservations,
    created_date
  )
VALUES
  (
    3,
    'Rød grød med blåbær',
    'Blend en portion modne bær som jordbær, blåbær, kirsebær eller hindbær, og du er godt på vej til den udødelige klassiker med navnet, der giver de fleste turister knuder på tungen.',
    'Herlev',
    '2023-02-23 17:11:54',
    150.0,
    20,
    CURRENT_DATE()
  );

-- Get a meal with any id, fx 1
SELECT
  *
FROM
  `Meal`
WHERE
  Meal.id = 1;

-- Update a meal with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE
  `Meal`
SET
  Meal.max_reservations = 50,
  Meal.price = 120
WHERE
  Meal.id = 1;

-- Delete a meal with any id, fx 1
DELETE FROM
  `Meal`
WHERE
  Meal.id = 4;

-- Reservation
-- Queries to write
-- Get all reservations
SELECT
  *
FROM
  `Reservation`;

-- Add a new reservation
INSERT INTO
  Reservation (
    id,
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email
  )
VALUES
  (
    2,
    15,
    2,
    '2023-01-24',
    '11-11-11-11',
    'Pope Francis',
    'humble@church.org'
  );

-- Get a reservation with any id, fx 1
SELECT
  *
FROM
  `Reservation`
WHERE
  Reservation.id = 1;

-- Update a reservation with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE
  `Reservation`
set
  Reservation.created_date = current_date(),
  Reservation.contact_phonenumber = '25-04-56-09'
WHERE
  Reservation.id = 1;

-- Delete a reservation with any id, fx 1
DELETE FROM
  `Reservation`
WHERE
  Reservation.id = 2;

-- Review
-- Queries to write
-- Get all reviews
SELECT
  *
FROM
  `Review`;

-- Add a new review
INSERT INTO
  `Review` (
    id,
    title,
    description,
    meal_id,
    stars,
    created_date
  )
VALUES
  (2, 'Joe Dassin', 'Tres bon!', 2, 5, '1983-01-10');

-- Get a review with any id, fx 1
SELECT
  *
FROM
  `Review`
WHERE
  Review.id = 1;

-- Update a review with any id, fx 1. Update any attribute fx the title or multiple attributes
UPDATE
  `Review`
set
  Review.created_date = CURRENT_DATE(),
  Review.stars = 4
where
  Review.id = 1;

-- Delete a review with any id, fx 1
DELETE FROM
  `Review`
WHERE
  Review.id = 2;

-- Additional queries
-- Now add a couple of different meals, reservations and reviews with different attributes. With those meals create the following queries
INSERT INTO
  Meal (
    id,
    title,
    description,
    location,
    Meal.when,
    price,
    max_reservations,
    created_date
  )
VALUES
  (
    1,
    'Peking Duck',
    'crunchy duck piles with sauce',
    'Copenhagen',
    '2023-01-28 00:00:00',
    500.0,
    6,
    '2023-01-24'
  );

INSERT INTO
  `Meal` (
    id,
    title,
    location,
    description,
    Meal.when,
    max_reservations,
    created_date,
    price
  )
VALUES
  (
    1,
    'Noodles',
    'CPH',
    'long lines of boiled dough',
    '2023-03-03 17:00:00',
    100,
    '2023-01-24',
    100
  );

INSERT INTO
  `Review` (
    id,
    title,
    description,
    stars,
    created_date,
    meal_id
  )
VALUES
  (
    3,
    'Grinch',
    'Not tasty at all',
    1,
    '2023-01-26',
    3
  );

INSERT INTO
  Reservation (
    id,
    number_of_guests,
    meal_id,
    created_date,
    contact_phonenumber,
    contact_name,
    contact_email
  )
VALUES
  (
    3,
    5,
    2,
    '2023-01-29',
    '11-11-11-00',
    'Mickey Mouse',
    'main@disney.com'
  );

-- Functionality
-- Get meals that has a price smaller than a specific price fx 90
SELECT
  *
FROM
  `Meal`
WHERE
  Meal.price <= 200;

-- Get meals that still has available reservations
SELECT
  *
FROM
  `Meal`
WHERE
  Meal.max_reservations >= COALESCE(
    (
      SELECT
        sum(Reservation.number_of_guests)
      FROM
        `Reservation`
      where
        Reservation.meal_id = Meal.id
    ),
    0
  );

-- Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
SELECT
  *
from
  `Meal`
where
  Meal.title like '%rød grød med%';

-- Get meals that has been created between two dates
SELECT
  *
FROM
  `Meal`
where
  Meal.created_date BETWEEN '2023-01-01' AND '2023-01-24';

-- Get only specific number of meals fx return only 5 meals
SELECT
  *
FROM
  `Meal`
limit
  2;

-- Get the meals that have good reviews
SELECT
  Meal.title,
  AVG(Review.stars)
FROM
  `Meal`
  join `Review` on Meal.id = Review.meal_id
GROUP BY
  Meal.title
HAVING
  AVG(Review.stars) > 4.2;

-- Get reservations for a specific meal sorted by created_date
SELECT
  Reservation.contact_name,
  Reservation.number_of_guests,
  Meal.title,
  Meal.when
FROM
  `Reservation`
  JOIN `Meal` on Reservation.meal_id = Meal.id
WHERE
  Meal.title like '%duck%'
ORDER BY
  Reservation.created_date DESC;

-- Sort all meals by average number of stars in the reviews
SELECT
  Meal.title,
  AVG(Review.stars)
FROM
  `Meal`
  join `Review` on Meal.id = Review.meal_id
GROUP BY
  Meal.title
ORDER BY
  AVG(Review.stars) DESC;
