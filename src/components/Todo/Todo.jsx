import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Todo.module.css";

export default function Todo({ todo, onDelete, onUpdate }) {
  const { id, text, status } = todo;
  const handleDelete = () => {
    onDelete(todo);
  };
  const handleUpdate = (e) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };
  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={status === "completed"}
        onChange={handleUpdate}
      ></input>
      <label htmlFor={id} className={styles.text}>
        {text}
      </label>
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
