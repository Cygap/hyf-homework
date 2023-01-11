USE HYF_lesson1
-- Find out how many tasks are in the task table
SELECT
  COUNT(id)
FROM
  task;

-- Find out how many tasks in the task table do not have a valid due date
SELECT
  count(id)
FROM
  task
where
  due_date IS NULL;

-- Find all the tasks that are marked as done
SELECT
  *
FROM
  task
WHERE
  status_id = 3;

-- Find all the tasks that are not marked as done
SELECT
  *
from
  task
WHERE
  status_id <> 3;

-- Get all the tasks, sorted with the most recently created first
SELECT
  title,
  description,
  created
from
  task
ORDER BY
  created DESC;

-- Get the single most recently created task
SELECT
  title,
  description,
  created
from
  task
ORDER BY
  created DESC
LIMIT
  1;

-- Get the title and due date of all tasks where the title or description contains database
SELECT
  title,
  due_date
from
  task
where
  (title LIKE "%database%")
  OR (description LIKE "%database%");

-- Get the title and status (as text) of all tasks
SELECT
  title,
  name
from
  task
  join status on status_id = status.id;

-- Get the name of each status, along with a count of how many tasks have that status
SELECT
  name,
  count(status_id)
from
  status
  join task on status_id = status.id
GROUP BY
  name;

-- Get the names of all statuses, sorted by the status with most tasks first
SELECT
  name,
  count(status_id)
from
  status
  join task on status_id = status.id
GROUP BY
  name
ORDER BY
  count(status_id) DESC;
