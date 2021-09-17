import { useState } from "react";
import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import Todo from "./models/todo";

function App() {
  const [todos,setTodos] = useState<Todo[]>([
    new Todo("Learn react"), new Todo("Learn typescript")
  ]);

  const addTodoHandler = (text: string) =>{
    const newTodo = new Todo(text)
    const newTodos = (prevTodos: Todo[]) =>{ return prevTodos.concat(newTodo)}
    setTodos(newTodos)
  }

  const onRemoveTodoHandler = (id: string) => {
    setTodos( (prevState)=>{return prevState.filter(todo => todo.id !== id ) })
  }

  return (
    <div>
      <Todos items={todos} onRemoveTodo={onRemoveTodoHandler}  />
      <NewTodo onAddTodo={addTodoHandler} ></NewTodo>
    </div>
  );
}

export default App;
