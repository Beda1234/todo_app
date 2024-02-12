import AppToDo from "./components/appToDo"
import Narbar from "./components/navbar"
import Todos from "./components/todos"
import "./App.css"
const App = () => {
  return (
    <div>
      <main>
        <h1 >SIMPLE TO DO APP FOR DAILY USAGE</h1>
        <Narbar/>
        <AppToDo/>
        <Todos/>
      </main>
    </div>
  )
}

export default App