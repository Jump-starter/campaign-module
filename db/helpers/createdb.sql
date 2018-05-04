CREATE TABLE levels(
  id serial PRIMARY KEY,
  project_id integer,
  cutoff_amount integer,
  name varchar(100),
  description text,
  estimated_delivery timestamp,
  ships_to varchar(100),
  includes text,
  max_backers integer
);

CREATE TABLE users(
  id serial PRIMARY KEY
);

CREATE TABLE users_levels(
  id serial PRIMARY KEY,
  level_id integer references levels(id),
  user_id integer references users(id)
);
