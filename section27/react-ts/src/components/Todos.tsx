import React from "react";
import Todo from "../models/todo";
import TodoComponent from "./Todo";
import classes from "./Todos.module.css"
const Todos: React.FC<{items: Todo[], onRemoveTodo: (id: string) => void}> = (props) => {
  return (
    <ul className={classes.todos}>
     {props.items.map((item: Todo)=>{
         return <TodoComponent onRemoveTodo={props.onRemoveTodo.bind(null, item.id)} todo={item}/>
     })}
    </ul>
  );
}

export default Todos;
