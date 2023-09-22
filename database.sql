CREATE DATABASE cnc_france;

CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  pseudo VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  jobs VARCHAR(50)
);

CREATE TABLE articles(
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE comments(
  comment_id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  user_id INT REFERENCES users(user_id),
  article_id INT REFERENCES articles(article_id)
);


