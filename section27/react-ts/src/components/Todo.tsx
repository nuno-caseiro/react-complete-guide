import React from "react"
import Todo from "../models/todo"
import classes from "./TodoItem.module.css"

const TodoComponent: React.FC<{todo: Todo, onRemoveTodo: (event: React.MouseEvent) =>void}> = props =>{
    return <li onClick={props.onRemoveTodo} key={props.todo.id} className={classes.item}>{props.todo.text}</li>
}

export default TodoComponent