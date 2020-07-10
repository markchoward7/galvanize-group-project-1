const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries.js");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = function (req, res, next) {
  console.log(`[${(new Date()).toJSON()}] - ${req.method} ${req.url}`);
  next()
}
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
}
// Middlewarez
app.use(logger)
app.use(allowCrossDomain);

//GET ALL VIEWS
app.get("/comp3/api/users", db.listUsers);
app.get("/comp3/api/exercises", db.listExercises)
app.get("/comp3/api/workouts", db.listWorkouts)
app.get("/comp3/api/workout_logs", db.listWorkoutLogs)

//GET INDIVIDUAL VIEWS

app.get("/comp3/api/workouts/:id", db.userWorkouts)
app.get("/comp3/api/users/:id", db.userProfile)
app.get("/comp3/api/history", db.workoutHistory)

//POSTS

app.post("/comp3/api/workout_logs/", db.logWorkout)
app.post("/comp3/api/exercises", db.addExercise)

//DELETE
app.delete("/comp3/api/workout_logs/:id", db.deleteWorkout)
app.delete("/comp3/api/exercises/:id", db.deleteExercise)



app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);