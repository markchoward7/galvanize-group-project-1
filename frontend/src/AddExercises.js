import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Form, Col } from "react-bootstrap";

function AddExercises() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState([]);
  const [exercisePart, setExercisePart] = useState([]);
  const [exerciseCategory, setExerciseCategory] = useState([]);
  const [deleteExercises, setDeleteExercises] = useState(null);
  const [reload, setReload] = useState(true);
  const [addExercises, setAddExercises] = useState(null);


  useEffect(() => {
    if (reload === true) {
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
    }
    setReload(false)
  }, [reload]);

  useEffect(() => {
    if (deleteExercises !== null) {
      fetch(`/comp3/api/exercises/${deleteExercises}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setDeleteExercises(null);
        setReload(true);
      });
    }
  }, [deleteExercises]);

  useEffect(() => {
    if (addExercises !== null) {
          let data = {
      exercise_name: exerciseName,
      body_part: exercisePart,
      exercise_category: exerciseCategory,
      created_at: Date.now(),
    };
    console.log(JSON.stringify(data));
    fetch("/comp3/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      }).then(() => {
        setAddExercises(null);
        setReload(true);
      });
    }
  }, [addExercises]);

  const handleSubmit = (event) => {
    setAddExercises(true);
  };

  const modifyButtons = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <Button
          id={cell}
          onClick={(event) => {
            setDeleteExercises(event.currentTarget.id);
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
      dataField: "body_part",
      text: "body_part",
      sort: true,
    },
    {
      dataField: "exercise_category",
      text: "exercise_category",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "created_at",
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


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h2>Add Exercise to Database</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control onChange={(e) => setExerciseName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridReps">
              <Form.Label>Body Part</Form.Label>
              <Form.Control onChange={(e) => setExercisePart(e.target.value)} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridWeight">
              <Form.Label>Exercise Category</Form.Label>
              <Form.Control
                onChange={(e) => setExerciseCategory(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={exercises}
          columns={columns}
          defaultSorted={defaultSorted}
        />
      </div>
    );
  }
}

export default AddExercises;
