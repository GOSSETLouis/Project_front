import { exit } from "process";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CreateTodo, Todo } from "../../types/todo";
import { TodoRequestType } from "../../types/todos-request";
import { TodosList } from "./TodosList";
import { TailSpin } from 'react-loader-spinner';
import { axios } from "../../utils/axios";

const TodosRequest = ({ filter, listFilter, addState }: TodoRequestType) => {
    // state requete GET
    const [requestState, setRequestState] = useState<
        "error" | "loading" | "success"
    >("loading");
    // state todos
    const [todosData, setTodosData]: [
        Todo[] | undefined,
        Dispatch<SetStateAction<Todo[] | undefined>>
    ] = useState();

    let isActive = false;
    if (requestState === "loading") {
        isActive = true
    }
    const getTodos = (): void => {
        setRequestState("loading");
        axios
            .get<Todo[]>("/")
            .then((response) => {
                setTodosData(response.data);
                setRequestState("success");
            })
            .catch((e) => {
                setRequestState("error");
            });

        console.log("Co");
    };
    useEffect(() => {
        getTodos();
    }, [addState]);

    const HandleCompletedTodo = (id: number, isCompleted: boolean): void => {
        axios
            .patch(`/${id}`, {
                isCompleted: !isCompleted,
            })
            .then((response) => {
                console.log(response);
                getTodos();
            })
            .catch((e) => {
                setRequestState("error");
            });

        console.log("Co");
    };
    const handleDeletedTodos = (id: number): void => {
        axios
            .delete(`/${id}`)
            .then((response) => {
                console.log(response);
                getTodos();
            })
            .catch((e) => {
                setRequestState("error");
            });
    };
    const updateTodos = (id: number, name: string, date: number | null): void => {
        axios
            .patch(`/Todo/Change/${id}`, {
                name: name,
                date: date
            })
            .then((response) => {
                console.log(response);
                getTodos();
            })
            .catch((e) => {
                setRequestState("error");
            });

        console.log("Co");
    };
    const sortedtodos = todosData?.sort(
        (a, b) => b.creationDate - a.creationDate
    );
    return (
        <>
            {requestState === "error" ? (<p>Error</p>) : requestState === "loading" ? (<TailSpin ariaLabel="loading-indicator" />) : <TodosList
                filter={filter}
                listfilter={listFilter}
                todos={sortedtodos as Todo[]}
                onCompleteTodo={HandleCompletedTodo}
                onUpdateTodo={updateTodos}
                onDeleteTodo={handleDeletedTodos}
            />}

        </>

    )
}

export { TodosRequest }