CREATE TABLE users (
    user_id serial PRIMARY KEY,
    full_name text,
    email text,
    admin_priv boolean,
    squadron text,
    base text,
    points integer
);

--workout_id integer REFERENCES other_database

CREATE TABLE competitions (
    competition_id serial PRIMARY KEY,
    title text,
    style text,
    duration_length integer,
    duration_name text,
    verified boolean,
    winners text,
    points integer,
    num_completed_1 integer,
    num_completed_2 integer
);

CREATE TABLE competitors (
    competitor_id serial,
    user_id integer REFERENCES users(user_id),
    competition_id integer REFERENCES competitions(competition_id)
);

CREATE TABLE prizes (
    prize_id serial,
    title text,
    points integer
);

INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Robin Olds', 'bamf@gmail.com', true, '69th Fighter Squadron', 'Luke', '420');
INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Billy Mitchell', 'luvplanes@hotmail.com', false, '69th Fighter Squadron', 'Luke', '718');
INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Dave Goldfein', 'csaf@gmail.com', false, '69th Fighter Squadron', 'Luke', '2020');

INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Kaleth Wright', 'ej@msn.com', true, '56th Aircraft Maintenance Squadron', 'Luke', '212');
INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('JoAnne Bass', 'big_shoes@gmail.com', false, '56th Aircraft Maintenance Squadron', 'Luke', '78');
INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Chuck Norris', 'karateking@yahoo.com', false, '56th Aircraft Maintenance Squadron', 'Luke', '17000');
INSERT INTO users (full_name, email, admin_priv, squadron, base, points) VALUES ('Bob Ross', 'happylittleaccidents@hotmail.com', false, '56th Aircraft Maintenance Squadron', 'Luke', '101');

INSERT INTO competitions (title, style, duration_length, duration_name, verified, points, num_completed_1, num_completed_2) VALUES ('Total miles ran', 'Team', '1', 'week', true, 40, 75, 90);
INSERT INTO competitions (title, style, duration_length, duration_name, verified, points, num_completed_1, num_completed_2) VALUES ('Maximum push-ups', 'Individual', '1', 'day', false, 15, 317, 212);

INSERT INTO competitors (user_id, competition_id) VALUES (1, 1);
INSERT INTO competitors (user_id, competition_id) VALUES (2, 1);
INSERT INTO competitors (user_id, competition_id) VALUES (3, 1);
INSERT INTO competitors (user_id, competition_id) VALUES (4, 1);
INSERT INTO competitors (user_id, competition_id) VALUES (5, 1);
INSERT INTO competitors (user_id, competition_id) VALUES (6, 1);

INSERT INTO competitors (user_id, competition_id) VALUES (3, 2);
INSERT INTO competitors (user_id, competition_id) VALUES (6, 2);

INSERT INTO prizes (title, points) VALUES ('Half-day pass', 3000);
INSERT INTO prizes (title, points) VALUES ('Lunch with the commander', 800);
INSERT INTO prizes (title, points) VALUES ('Five dollars', 300);
INSERT INTO prizes (title, points) VALUES ('Hella close parking spot', 1000);
