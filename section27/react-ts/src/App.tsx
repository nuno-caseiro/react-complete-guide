import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import TodosContextProvider from "./store/todos-context";

function App() {
  return (
    <TodosContextProvider>
      <Todos />
      <NewTodo />
    </TodosContextProvider>
  );
}

export default App;
