INSERT INTO users (username, password, profilePic)
VALUE ($1, $2, $3)
RETURNING user_id;