use HYF_lesson1;

select
  *
from
  task
  left join status on status_id = status.id;

select
  count(task.id)
from
  task
  LEFT join user on task.user_id = user.id
  inner join status on task.status_id = status.id;

select
  *
from
  task
where
  id = 35;
