import React from 'react'
import { useLocalStorage } from './useLocalStorage';
// ? Acá importamos tambien el TodoContext
const TodoContext= React.createContext()

function TodoProvider(props) {
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
    // todos[todoIndex],   tex:todos[todoIndex].text,
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
        //*? Todas las propiedades que quedramos compartir deben estar en value
        //*? Como se va a compartir varias propiedades entonces serán un objeto
        //*? Como es objeto se enviarán en doble llaves 
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {/* //*? Estos componentes de children van a poder usar nuestro consumidor */}
            {props.children}
        </TodoContext.Provider>
    )
}
export{TodoProvider,TodoContext}
