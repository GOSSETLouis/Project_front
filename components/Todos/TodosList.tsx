import { List } from "@mui/material";
import { useMemo } from "react";

import type { TodosListProperties } from "../../types/todos-list";
import { TodoItem } from "./TodoItem";
// import mc from "./todos-list.module.scss";

// Component TodosList, to create the main <ul> wich will regroup every todo items as <li>
const TodosList = ({
  filter,
  listfilter,
  todos,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
}: TodosListProperties): JSX.Element => {
  const handleComplete = (id: number, isCompleted: boolean): void => {
    onCompleteTodo(id, isCompleted);
  };

  const handleUpdateTodos = (
    id: number,
    value: string,
    date: number | null
  ): void => {
    onUpdateTodo(id, value, date);
  };
  const handleTodoDelete = (id: number): void => {
    onDeleteTodo(id);
  };
  const getList = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === "COMPLETED") {
          return todo.isCompleted;
        }
        if (filter === "NOTCOMPLETED") {
          return !todo.isCompleted;
        }
        if (filter === "DEADLINE") {
          return todo.deadline;
        }
        return todos;
      }),
    [filter, todos]
  );

  const GetActualList = getList.map((todo) => (
    <TodoItem
      key={todo.id}
      name={todo.name}
      id={todo.id}
      isCompleted={todo.isCompleted}
      onComplete={handleComplete}
      onUpdate={handleUpdateTodos}
      // eslint-disable-next-line unicorn/no-null
      deadline={todo.deadline !== null ? todo.deadline : null}
      listfilter={listfilter}
      creationDate={todo.creationDate}
      onDelete={handleTodoDelete}
    />
  ));
  // Return Getlist Component inside the ul
  return (
    <>
      {listfilter ? (
        <List
          sx={{
            m: "auto",
            p: "5%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {GetActualList}
        </List>
      ) : (
        <List
          sx={{
            m: "auto",
            p: "5%",
            textAlign: "center",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {GetActualList}
        </List>
      )}
    </>
  );
};

export { TodosList };
