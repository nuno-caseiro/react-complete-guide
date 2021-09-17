import React, {useContext} from "react";
import Todo from "../models/todo";
import TodoComponent from "./Todo";
import classes from "./Todos.module.css"
import { TodosContext } from "../store/todos-context";

const Todos: React.FC = () => {
  const ctx = useContext(TodosContext)
  return (
    <ul className={classes.todos}>
     {ctx.items.map((item: Todo)=>{
         return <TodoComponent onRemoveTodo={ctx.removeTodo.bind(null, item.id)} todo={item}/>
     })}
    </ul>
  );
}

export default Todos;
