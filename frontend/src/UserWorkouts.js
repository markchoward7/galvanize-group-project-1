import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Form, Col } from "react-bootstrap";

function UserWorkouts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [logSets, setlogSets] = useState([]);
  const [logReps, setlogReps] = useState([]);
  const [logExercise, setlogExercise] = useState([]);
  const [logWeight, setlogWeight] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [reload, setReload] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);


  useEffect(() => {
    fetch(`/comp3/api/exercises`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setExercises(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    if (reload === true) {
      fetch(`/comp3/api/history`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setWorkoutHistory(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
    setReload(false);
  }, [reload]);

  const [deleteWorkout, setDeleteWorkout] = useState(null);

  useEffect(() => {
    if (deleteWorkout !== null) {
      fetch(`/comp3/api/workout_logs/${deleteWorkout}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setDeleteWorkout(null);
        setReload(true);
      });
    }
  }, [deleteWorkout]);

  useEffect(() => {
    let ex_name = exercises.find((i) => i["exercise_name"] === logExercise);
    if (submitStatus !== null) {
      let data = {
        user_id: 1,
        exercise: ex_name.id,
        workout: 1,
        set_number: logSets,
        weight: logWeight,
        reps: logReps,
      };
      fetch("/comp3/api/workout_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    setSubmitStatus(null);
    setReload(true);
  }, [submitStatus]);

  const handleSubmit = (event) => {
    setSubmitStatus(true);
  };

  const modifyButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <Button
          id={cell}
          onClick={(event) => {
            setDeleteWorkout(event.currentTarget.id);
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "exercise_name",
      text: "Exercise",
      sort: true,
    },
    {
      dataField: "workout",
      text: "workout_id",
      sort: true,
    },
    {
      dataField: "set_number",
      text: "Set",
      sort: true,
    },
    {
      dataField: "weight",
      text: "weight",
      sort: true,
    },
    {
      dataField: "reps",
      text: "reps",
      sort: true,
    },
    {
      dataField: "user_id",
      text: "user_id",
      sort: true,
    },
    {
      dataField: "id",
      csvExport: false,
      formatter: modifyButtons,
      formatExtraData: "edit",
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const stopWorkout = () => {
    setReload(true)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>Log Exercise to Workout</h2>
          <Button variant="primary" onClick={stopWorkout}>
            Stop Workout
          </Button>
        <Form key="workoutForm" onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridExercise">
              <Form.Label key="exercise">Exercise</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Choose Exercise"
                onChange={(e) => setlogExercise(e.target.value)}
              >
                <option>Choose Exercise</option>
                {exercises.map((item) => (
                  <option key={item.exercise_name}>{item.exercise_name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSets">
              <Form.Label>Set Number</Form.Label>
              <Form.Control onChange={(e) => setlogSets(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridReps">
              <Form.Label>Reps</Form.Label>
              <Form.Control onChange={(e) => setlogReps(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control onChange={(e) => setlogWeight(e.target.value)} />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={workoutHistory}
          columns={columns}
          defaultSorted={defaultSorted}
        />
      </div>
    );
  }
}

export default UserWorkouts;
