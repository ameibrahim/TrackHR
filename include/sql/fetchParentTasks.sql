SELECT task.task_id, name, description FROM `task`
JOIN collaborators ON collaborators.task_id = task.task_id
WHERE collaborators.user_id = 'abcdefghi'