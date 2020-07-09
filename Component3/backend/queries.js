const Pool = require("pg").Pool;

const pool = new Pool({
  user: "admin",
  password: "admin",
  database: "component3",
  host: "comp3_database",
  port: 5432,
});

const listUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const listExercises = (request, response) => {
  pool.query("SELECT * FROM exercises", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const listWorkouts = (request, response) => {
  pool.query("SELECT * FROM workout", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const listWorkoutLogs = (request, response) => {
  pool.query("SELECT * FROM workout_log", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const userWorkouts = (request, response) => {
  let id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM workout WHERE user_id= $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const userProfile = (request, response) => {
  let id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const workoutHistory = (request, response) => {
  pool.query(
    "SELECT exercises.exercise_name, workout_log.workout, workout_log.set_number, workout_log.weight, workout_log.reps, workout_log.user_id, workout_log.id \
    FROM exercises \
    INNER JOIN workout_log ON exercises.id=workout_log.exercise;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const logWorkout = (request, response) => {
  let { user_id, exercise, workout, set_number, weight, reps } = request.body;
  pool.query(
    "INSERT INTO workout_log(user_id, exercise, workout, set_number, weight, reps) VALUES($1, $2, $3, $4, $5, $6)",
    [user_id, exercise, workout, set_number, weight, reps],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Workout Logged");
    }
  );
};

const addExercise = (request, response) => {
  let { exercise_name, body_part, exercise_category } = request.body;
  pool.query(
    "INSERT INTO exercises(exercise_name, body_part, exercise_category) VALUES($1, $2, $3)",
    [exercise_name, body_part, exercise_category],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Exercise Added");
    }
  );
};

const deleteWorkout = (request, response) => {
  let id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM workout_log WHERE id=($1)",
    [id],
    (error, results) => {
      if (error) {
        //throw error;
        console.log(error)
        response.status(500).send()
      }
      response.status(200).send("Workout Deleted");
    }
  );
};

const deleteExercise = (request, response) => {
  let id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM exercises WHERE id=($1)",
    [id],
    (error, results) => {
      if (error) {
        //throw error;
        console.log(error)
        response.status(500).send()
      }
      response.status(200).send("Workout Deleted");
    }
  );
};

module.exports = {
  listUsers,
  listExercises,
  listWorkouts,
  listWorkoutLogs,
  userWorkouts,
  userProfile,
  workoutHistory,
  logWorkout,
  addExercise,
  deleteWorkout,
  deleteExercise
};
