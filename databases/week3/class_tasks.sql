use HYF_lesson2;

SELECT
  task.title,
  task.description,
  user.name
FROM
  task
  join user_task on user_task.task_id = task.id
  join user on user.id = user_task.user_id
WHERE
  user.name like "%Pavel%";

SELECT
  count(task.id) tasks_per_user,
  user.name
FROM
  task
  join user_task on user_task.task_id = task.id
  join user on user.id = user_task.user_id
GROUP BY
  user.name;

SELECT
  count(task.id) Done_tasks_per_user,
  user.name
FROM
  task
  join user_task on user_task.task_id = task.id
  join user on user.id = user_task.user_id
  join status on task.status_id = status.id
WHERE
  status.name like "%Done%"
GROUP BY
  user.name;
