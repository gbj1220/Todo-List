import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const initialTodos = window.localStorage.getItem("todos")
    ? JSON.parse(window.localStorage.getItem("todos"))
    : [];

  const [todoArray, setTodoArray] = useState(initialTodos);
  const [todo, setTodo] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  const addTodo = (todo) => {
    let newTodoArray = [
      ...todoArray,
      {
        id: uuidv4(),
        todo: todo,
      },
    ];
    setTodoArray(newTodoArray);
  };

  const displayTodos = () => {
    return todoArray.forEach((todo) => {
      return <h3>{todo.todo}</h3>;
    });
  };

  const removeItems = () => {
    window.localStorage.clear();
  };

  const testing = () => {
    todoArray.forEach((todo) => {
      console.log(todo.todo);
    });
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todoArray));
  }, [todoArray]);

  return (
    <div style={{ textAlign: "center" }}>
      <form className={classes.root} action='submit' onSubmit={handleOnSubmit}>
        <TextField
          id='outlined-basic'
          label='Enter Todo Item'
          variant='outlined'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save Todo
        </Button>
        <div>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={removeItems}
          >
            Delete
          </Button>
          <span>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={testing}
              className={classes.button}
            >
              Test
            </Button>
          </span>
        </div>
        {displayTodos()}
      </form>
    </div>
  );
}

export default App;
