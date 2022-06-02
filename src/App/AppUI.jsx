import React from "react";
import "./App.css";
//? Acá es donde importamos el contexto
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";
export const AppUI = () => {
    //? Acá tenemos a nuestro value el cual guardamos en el Provider
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo
    } = React.useContext(TodoContext)
    const [isModalClose,setModalClosed]= React.useState(true)
    
    const saveTodo=()=>{
        let newTodo = {text:'tarea4',completed:false}
        searchedTodos.push(newTodo)
        console.log('saveToods',searchedTodos)
        setModalClosed(false)
    }
    const openModal=()=>{
      // setModalClosed(true)
      return console.log('click')
    }
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
                {isModalClose && 
                <Modal>
                  <button onClick={()=>saveTodo(false)}> save Todo</button>  
                  <button onClick={()=>setModalClosed(false)}> close Modal</button>  
                </Modal>}
                {searchedTodos.map((todo) => (
                  <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                  />
                  ))}
                  {console.log( searchedTodos ,'searchedTodosFueraDelmodal1')}
              </TodoList>

                {console.log( searchedTodos ,'searchedTodosFueraDelmodal')}
              
      <CreateTodoButton onClick={()=>openModal}/>
    </>
  );
};
