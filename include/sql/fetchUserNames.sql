SELECT user_id, firstname, lastname from users 
WHERE username REGEXP 'a' OR firstname REGEXP 'a' OR lastname REGEXP 'a'
ORDER BY firstname ASC
LIMIT 3