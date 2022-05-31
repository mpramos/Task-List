import React from "react";
import "./App.css";
//? Acá es donde importamos el contexto
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
export const AppUI = () => {
    //? Acá tenemos a nuestro value el cual guardamos en el Provider
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo
    } = React.useContext(TodoContext)
  return (
    <>
      <TodoCounter />
      <TodoSearch />
           {/* //*? Enviaremos una funcion el cual va a recibir la informacion 
           //*? de value*/}
                <TodoList>
                {error && <p>Desesperate , hubo un error... </p>}
                {loading && <p>Estamos cargando, no desesperes....</p>}
                {!loading && !searchedTodos.length && <p> Crea tu primer Todo</p>}
        
                {searchedTodos.map((todo) => (
                  <TodoItem
                    key={todo.text}
                    text={todo.text}
                    completed={todo.completed}
                    onComplete={() => completeTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                  />
                ))}
              </TodoList>
      <CreateTodoButton />
    </>
  );
};
