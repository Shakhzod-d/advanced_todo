import React from "react";
import { FaPlus } from "react-icons/fa";
import "./TodoButton.scss";

const AddTodoButton = ({ onClick }) => {
  return (
    <button className="add-todo-button" onClick={onClick}>
      <FaPlus className="icon" />
      Add Todo
    </button>
  );
};

export default AddTodoButton;
