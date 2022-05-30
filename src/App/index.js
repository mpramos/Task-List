import React from "react";
import { AppUI } from "./AppUI";
// const defaultTodos = [
//   { text: "Cortar cebolla 1", completed: false },
//   { text: "llorar con la llorona", completed: true },
//   { text: "ir al museo", completed: false },
//   { text: "lavar ropa", completed: true },
// ];
/**
 * 
 * @itemName
 * ? Es el elemento con el que trabajaremos dentro del hook para la persistencia de datos
 * @initialValue
 * ? Este parametro lo usaremos para que se puede almacenar un array o un string con más libertad
 */
function useLocalStorage(itemName,initialValue) {
  const localStorageItem=localStorage.getItem(itemName) ;
  // *? Creamos en primer array por si aun el usuario no ha creado nada
  // *? Si es que ese localStorage ya existe entonces traeremos la informacion
  let parsedItem;

  if(!localStorageItem){ //*? Si No existe nada en el local Storage
    localStorage.setItem(itemName,JSON.stringify(initialValue));
    parsedItem=initialValue;
  } else{
    parsedItem=JSON.parse(localStorageItem)
  }

  const [item, setItem] = React.useState(parsedItem);
  //*? Desde aqui hacemos persistencia de datos para la lista de tareas
  //*? La funcion saveTodos servirá como puente para localStorage y completeTodo
  const saveItem=(newItem)=>{
    const stringifiedItem=JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem)
  };
  return [
    item,
    saveItem,
  ]
}

function App() {
  
  const [todos,saveTodos]=useLocalStorage('TODOS_V1',[])
  const [patitos,savePatitos]=useLocalStorage('PATITO_V1','MARIA')
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
  return [
    <p>{patitos}</p>,
    <AppUI
    totalTodos={totalTodos}
    completedTodos={completedTodos}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  ];
}

export default App;
