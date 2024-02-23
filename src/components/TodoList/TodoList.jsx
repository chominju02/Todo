import React, { useState, useEffect } from "react";
import Todo from "../Todo/Todo";
import AddTodo from "../AddTodo/AddTodo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filterd = getFilteredItems(todos, filter);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filterd.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            ></Todo>
          );
        })}
      </ul>
      <AddTodo handleAdd={handleAdd}></AddTodo>
    </section>
  );
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

//이벤트 핸들러를 등록하면 setTodo가 실행되고, 이때 상태가 변경되면서 리렌더링된다
//리렌더링 되면서 todos가 새로 갱신되고 새로운 li가 생성될 수 있음
function getFilteredItems(todos, filter) {
  if (filter === "all") return todos;
  return todos.filter((todo) => todo.status === filter);
}
