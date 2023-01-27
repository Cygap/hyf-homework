CREATE TABLE `Reservation` (
  `id` int,
  `number_of_guests` int,
  `meal_id` int,
  `created_date` date,
  `contact_phonenumber` varchar(255),
  `contact_name` varchar(255),
  `contact_email` varchar(255)
);

CREATE TABLE `Meal` (
  `id` int,
  `title` varchar(255),
  `description` text,
  `location` varchar(255),
  `when` datetime,
  `max_reservations` int,
  `price` decimal,
  `created_date` date
);

CREATE TABLE `Review` (
  `id` int,
  `title` varchar(255),
  `description` text,
  `meal_id` int,
  `stars` int,
  `created_date` date
);

ALTER TABLE `Reservation` ADD FOREIGN KEY (`meal_id`) REFERENCES `Meal` (`id`);

ALTER TABLE `Review` ADD FOREIGN KEY (`meal_id`) REFERENCES `Meal` (`id`);
