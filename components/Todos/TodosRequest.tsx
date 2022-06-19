/* eslint-disable no-nested-ternary */
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import type { Todo } from "../../types/todo";
import type { TodoRequestType } from "../../types/todos-request";
import { axios } from "../../utils/axios";
import { TodosList } from "./TodosList";

const TodosRequest = ({
  filter,
  listFilter,
  addState,
}: TodoRequestType): JSX.Element => {
  // state requete GET
  const [requestState, setRequestState] = useState<
    "error" | "loading" | "success"
  >("loading");
  // state todos
  const [todosData, setTodosData]: [
    Todo[] | undefined,
    Dispatch<SetStateAction<Todo[] | undefined>>
  ] = useState();
  const getTodos = (): void => {
    setRequestState("loading");
    axios
      .get<Todo[]>("/")
      .then((response) => {
        setTodosData(response.data);
        setRequestState("success");
      })
      .catch(() => {
        setRequestState("error");
      });
  };
  useEffect(() => {
    getTodos();
  }, [addState]);

  const HandleCompletedTodo = (id: number, isCompleted: boolean): void => {
    axios
      .patch(`/${id}`, {
        isCompleted: !isCompleted,
      })
      .then(() => {
        getTodos();
      })
      .catch(() => {
        setRequestState("error");
      });
  };
  const handleDeletedTodos = (id: number): void => {
    axios
      .delete(`/${id}`)
      .then(() => {
        getTodos();
      })
      .catch(() => {
        setRequestState("error");
      });
  };
  const updateTodos = (id: number, name: string, date: number | null): void => {
    axios
      .patch(`/Todo/Change/${id}`, {
        name: name,
        date: date,
      })
      .then(() => {
        getTodos();
      })
      .catch(() => {
        setRequestState("error");
      });
  };
  const sortedtodos = todosData?.sort(
    (a, b) => b.creationDate - a.creationDate
  );
  return (
    <>
      {requestState === "error" ? (
        <p>Error</p>
      ) : requestState === "loading" ? (
        <TailSpin ariaLabel="loading-indicator" />
      ) : (
        <TodosList
          filter={filter}
          listfilter={listFilter}
          todos={sortedtodos as Todo[]}
          onCompleteTodo={HandleCompletedTodo}
          onUpdateTodo={updateTodos}
          onDeleteTodo={handleDeletedTodos}
        />
      )}
    </>
  );
};

export { TodosRequest };
