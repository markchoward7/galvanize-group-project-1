CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "f_name" varchar,
  "l_name" varchar,
  "username" varchar
);

CREATE TABLE "exercises" (
  "id" SERIAL PRIMARY KEY,
  "exercise_name" varchar,
  "body_part" varchar,
  "exercise_category" varchar,
  "created_at" timestamp
);

CREATE TABLE "workout" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "workout_id" int,
  "exercise_id" int
);

CREATE TABLE "workout_log" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "exercise" int,
  "workout" int,
  "set_number" int,
  "weight" int,
  "reps" int
);

ALTER TABLE "workout_log" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout" ADD FOREIGN KEY ("exercise_id") REFERENCES "exercises" ("id");

ALTER TABLE "workout_log" ADD FOREIGN KEY ("exercise") REFERENCES "exercises" ("id");

ALTER TABLE "workout_log" ADD FOREIGN KEY ("workout") REFERENCES "workout" ("id");

INSERT INTO users
    (f_name, l_name, username)
VALUES('Bob', 'Barker', 'bobbarker');

INSERT INTO exercises
    (exercise_name, body_part, exercise_category)
VALUES('bench press', 'chest', 'barbell');

INSERT INTO workout
    (user_id, workout_id, exercise_id)
VALUES(1, 1, 1);

INSERT into "workout_log"
    (user_id, exercise, workout, set_number, weight, reps)
VALUES(1, 1, 1, 1, 200, 12);

