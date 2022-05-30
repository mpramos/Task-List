import React from "react";
import { AppUI } from "./AppUI";
// const defaultTodos = [
//   { text: "Cortar cebolla 1", completed: false },
//   { text: "llorar con la llorona", completed: true },
//   { text: "ir al museo", completed: false },
//   { text: "lavar ropa", completed: true },
// ];
function App() {
  const localStorageTodos=localStorage.getItem('TODOS_V1') ;
  // *? Creamos en primer array por si aun el usuario no ha creado nada
  let parsedTodos;
  // *? Si es que ese localStorage ya existe entonces traeremos la informacion
  if(!localStorageTodos){ //*? Si No existe nada en el local Storage
    localStorage.setItem('TODOS_V1',JSON.stringify([]));
    parsedTodos=[];
  } else{
    parsedTodos=JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = React.useState(parsedTodos);
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
    searchedTodos = todos.filter((todo) => {
      // *? Tenemos dos textos para la comparativa
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }
  //*? Desde aqui hacemos persistencia de datos para la lista de tareas
  //*? La funcion saveTodos servirá como puente para localStorage y completeTodo
  const saveTodos=(newTodos)=>{
    const stringifiedTodos=JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos)
  }

  const completeTodo = (text) => {
    //*? Extraemos la posicion de la tarea que queremos eliminar para poder editarlo
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    // todo: tambien se puede hacer de esta otra forma 👇para cambiar a tarea completada
    // todos[todoIndex]={
    //   text:todos[todoIndex].text,
    //   completed:true
    // }
    // *? Insertamos todos los todos a la nueva lista newTodos
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
