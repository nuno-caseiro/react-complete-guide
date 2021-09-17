import React, { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};


export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([
    new Todo("Learn react"),
    new Todo("Learn typescript"),
  ]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    const newTodos = (prevTodos: Todo[]) => {
      return prevTodos.concat(newTodo);
    };
    setTodos(newTodos);
  };

  const onRemoveTodoHandler = (id: string) => {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: onRemoveTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider
