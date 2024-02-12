import { ReactNode, createContext, useContext, useState } from "react";

// Creating custom types using type declaration
// ReactNode is a generic type that covers a wide range of possible children types ,including jsx elements , String and other react components
export type TodosProviderProps={
    children : ReactNode;
}
// Create Context is for collect all your project data and store inside the createContext
// This means that createContext data type is TodosContext type or null type bcz some time we will get null data there so null type as well
export const todosContext =createContext<TodosContext | null>(null);

export type Todo={
    id:string ;
    task:string;
    completed:boolean;
    createdAt:Date;
}

// This is called as a call signature 
export type TodosContext ={
    todos:Todo[]
    handleAddToDo: (task: string) => void;  // Function to add a new todo in array of tasks
    toggleTodoAsCompleted:(id:string)=>void;   //Function to mark a specific todo as completed or not
    handleDeleteTodo: (id: string) => void;     //Function to delete a specific todo by its ID
}

// This is the provider  that will wrap around our app.js file, this will provide access to any component nested within it
// Whatever the data present in the createContext hook to give those data we must need  to provide it through provider. So here this is the provider
//  we must need to pass childern in order to use this context. And that children must be in small latter
// Here Children is like the whole app bcz  we are passing the whole app inside the provider we can check that in main.tsx file we can see something like this 
// <TodosProvider><App /></TodosProvider>
export const TodosProvider = ({children}:TodosProviderProps) =>{ 
    const [todos,setTodos]=useState<Todo[]>(()=>{
        try {
            // If any data is there in the localsrorage then it will fetch and give the data to todos and if no data is there then it will return null
            const newTodos=localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
           return  [];
        }
    });  

    const handleAddToDo =(task:string)=>{
        setTodos((prev)=>{
            const newTodos:Todo[]=[{
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
            }
            ,...prev
        ]
        // console.log("my prev :"+prev);
        // console.log(newTodos);
        // By this way we will store our data in local storage so that if we refresh our page then we will not loss any data 
        localStorage.setItem('todos',JSON.stringify(newTodos));
        return newTodos;
        })
    }
    // Mark the todo as completed 
    const toggleTodoAsCompleted =(id:string)=>{
        setTodos((prev)=>{
            let newTodos = prev.map((todo)=>{
                if(todo.id === id){
                    return {...todo,completed:!todo.completed};
                }
                return todo;
            })
            // By this way we will store our data in local storage so that if we refresh our page then we will not loss any data 
        localStorage.setItem('todos',JSON.stringify(newTodos));
            return newTodos;
        })
    }
    // Delete the todo 
    const handleDeleteTodo= (id:string)=>{
        setTodos((prev)=>{
            let newTodos = prev.filter((filterTodo)=>filterTodo.id !== id);
            // By this way we will store our data in local storage so that if we refresh our page then we will not loss any data 
        localStorage.setItem('todos',JSON.stringify(newTodos));
            return newTodos;
        })
    }

    // Data that we want to share with our components
    return <todosContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todosContext.Provider>
}

// Consumer 
export const useTodos =()=>{
    const todosConsumer =useContext(todosContext);
    if(!todosConsumer){
        throw new Error("must wrap your component inside the provider")
    }else{
       return todosConsumer;
    }
}