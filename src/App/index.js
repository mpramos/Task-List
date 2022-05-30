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
function useLocalStorage(itemName, initialValue) {
  //*? Vamos a simular un comportamiento de una API
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  //*? Ya no vamos a tener el array que teniamos antes ahora vamos a tener el initialValue
  // *? initialValue => puede ser un array vacio, string o lo que sea
  const [item, setItem] = React.useState(initialValue);
  React.useEffect(() => {
    // *? Va a contener va a simular que la informacion va a tardar un segundo en cargar
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        // *? Creamos en primer array por si aun el usuario no ha creado nada
        // *? Si es que ese localStorage ya existe entonces traeremos la informacion
        let parsedItem;

        if (!localStorageItem) {
          //*? Si No existe nada en el local Storage
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        // *? setItem Nos va a entregae el verdadero cvalor que está almacenado en local Storage
        setItem(parsedItem);
        // *? Cuando termine de leer la informacion setearemos el loading a false
        // *? Eso quedrá decir que la aplicación terminó de cargar
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
  });

  //*? Desde aqui hacemos persistencia de datos para la lista de tareas
  //*? La funcion saveTodos servirá como puente para localStorage y completeTodo
  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error)
    }
  };
  // *! Cuando vamos a entregar más de dos elementos debemos devolver en un objeto
  return {
    item,
    saveItem,
    loading,
    error
  };
}
function App() {
  // *! tenemos que llamar en un objeto a ese customHook
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage("TODOS_V1", []);
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

  return (
    <AppUI
      error={error}
      loading={loading}
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
