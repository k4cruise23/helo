SELECT * FROM posts
WHERE lower(title) LIKE $1
OR lower(content) LIKE $1
AND user_id != $2;