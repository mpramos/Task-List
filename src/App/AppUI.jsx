import React from 'react'
import "./App.css";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
export const AppUI = ({
      loading,
      error,
      totalTodos,
      completedTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
}) => {
  return (
    <>
    <TodoCounter total={totalTodos} completed={completedTodos}></TodoCounter>
    <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
    <TodoList>
        {error && <p>Desesperate , hubo un error... </p>}
        {loading && <p>Estamos cargando, no desesperes....</p>}
        {(!loading && !searchedTodos.length) && <p> Crea tu primer Todo</p>}

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
  )
}
