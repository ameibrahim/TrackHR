SELECT a.id, a.task_id, a.supertask_id, a.start_date, a.start_date, a.end_date, a.name, a.description, a.progress, a.completed, a.creator_id, COUNT(b.task_id) AS children
FROM
    task a LEFT JOIN
    task b ON a.task_id = b.supertask_id
GROUP BY a.task_id