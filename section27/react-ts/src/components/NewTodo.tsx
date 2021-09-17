import React, {useRef, useContext} from "react"
import classes from "./NewTodo.module.css"
import { TodosContext } from "../store/todos-context"
//em vez de  function, usar: (text: string) => void
const NewTodo: React.FC =(props) => {
    const ctx = useContext(TodosContext)
    const todoTextInputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (event: React.FormEvent) =>{
        event.preventDefault()

        const enteredText = todoTextInputRef.current!.value

        if(enteredText.trim().length === 0){
            //throw error
            return
        }

        ctx.addTodo(enteredText)

    }
    return (<form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="text">Todo text</label>
        <input type="text" ref={todoTextInputRef} id="text"></input>
        <button>Add Todo</button>
    </form>)
}

export default NewTodo