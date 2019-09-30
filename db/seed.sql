CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT,
  imageURL TEXT,
  content TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  profileImage TEXT,
  password TEXT
);