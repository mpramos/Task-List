import "./App.css";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
import React from "react";

const defaultTodos = [
  { text: "Cortar cebolla 1", completed: false },
  { text: "llorar con la llorona", completed: true },
  { text: "ir al museo", completed: false },
  { text: "lavar ropa", completed: true },
];
function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState("");
  // *? contando TODOs
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  // *? Buscando TODOs
  if (!searchValue.length >= 1) {
    // *? muestra todos los Todos
    searchedTodos = todos;
  } else {
    // *? muestra solo los Todos que coincidan con el todo que estoy buscando
    searchedTodos = todos.filter(todo => {
      // *? Tenemos dos textos para la comparativa
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  const completeTodo =(text)=>{
    //*? Extraemos la posicion de la tarea que queremos eliminar para poder editarlo
      const todoIndex= todos.findIndex(todo=>todo.text=== text)
      // todo: tambien se puede hacer de esta otra forma 👇para cambiar a tarea completada
      // todos[todoIndex]={
      //   text:todos[todoIndex].text,
      //   completed:true
      // }
      // *? Insertamos todos los todos a la nueva lista newTodos
      const newTodos =[...todos]
      newTodos[todoIndex].completed= true;
      setTodos(newTodos);

  }
  const deleteTodo =(text)=>{
      const todoIndex= todos.findIndex(todo=>todo.text=== text)
      const newTodos =[...todos]
      newTodos.splice(todoIndex,1)
      setTodos(newTodos);

  }
  return (
    <>
      <TodoCounter total={totalTodos} completed={completedTodos}></TodoCounter>
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={()=>completeTodo(todo.text)}
            onDelete ={()=>deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton />
    </>
  );
}

export default App;
