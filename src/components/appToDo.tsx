import { useState } from "react";
import { useTodos } from "../store/todos";

const AppToDo = () => {
    const[todo, setTodos] = useState("");
    const {handleAddToDo} = useTodos();
    const handleFormSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        handleAddToDo(todo);
        setTodos("");
    }
  return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" value={todo} onChange={(e)=>setTodos(e.target.value)} />
        <button type="submit">Add</button>
    </form>
  )
}

export default AppToDo