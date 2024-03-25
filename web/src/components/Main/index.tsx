import React, { useEffect, useState } from "react";

import { Interfaces } from "../../../@types/interfaces";

import { CreateTodo } from "../CreateTodo";
import { Todo } from "../Todo";

import { MainContainer } from "./styles";

import config from "@web/outside-config/config.json";

/* ----------
 * Add backend URL provided by the cdk deploy here!
 * ---------- */
const backend_url = `https://${
  process.env.REACT_APP_ENV === "production"
    ? config.backend_subdomain
    : config.backend_dev_subdomain
}.${config.domain_name}`;

export const Main: React.FC = () => {
  /* ----------
   * States
   * ---------- */
  const [todos, setTodos] = useState<Interfaces.Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const getResponse = await fetch(backend_url, {
          method: "GET",
        });
        const response = await getResponse.json();
        setTodos(response.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoSubmit = async ({
    new_todo,
  }: {
    new_todo: Interfaces.Todo;
  }) => {
    try {
      const getResponse = await fetch(backend_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: new_todo }),
      });
      const response = await getResponse.json();
      setTodos((current_todos) => [...current_todos, response.todo]);
    } catch (error) {
      console.error(error);
    }
  };

  const to_complete = todos.filter((todo) => !todo.todo_completed).length;
  const completed = todos.filter((todo) => todo.todo_completed).length;

  return (
    <MainContainer>
      <h1>Today</h1>

      <CreateTodo handleTodoSubmit={handleTodoSubmit} />

      <p>
        {completed}/{to_complete} completed
      </p>

      {todos.map((t) => (
        <Todo todo={t} />
      ))}
    </MainContainer>
  );
};
