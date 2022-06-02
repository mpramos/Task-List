import React from 'react'
import { TodoContext } from '../TodoContext'
import './TodoForm.css'
export const TodoForm = () => {
  const [newTodoValue,setNewTodoValue]=React.useState('')
  const {
    addTodo,
    setOpenModal
  }= React.useContext(TodoContext)
  const onChange=(event)=>{
      setNewTodoValue(event.target.value)
  }
  const onCancel=()=>{
    setOpenModal(false)
  }
  const onSubmit=(event)=>{
    // event.preventDefault();
    addTodo(newTodoValue)
    setOpenModal(false)
  }
  return (
    //*? Los formularios tienen su evento onSubmit
    <form onSubmit={onSubmit}>
      <label> Escribe tu nueva tarea</label>
      <textarea
      value={newTodoValue}
      onChange={onChange}
      placeholder="Escribe una nueva tarea"
      
      />
      <div className="TodoForm-buttonContainer">
        <button
        className="TodoForm-button TodoForm-button-cancel"
        type="button"
        onClick={onCancel}
        >
          Cancelar
        </button>
        <button
        className="TodoForm-button TodoForm-button-add"
        // con el submit por defecto crea la pagina 
        type="submit"
        >Añadir
        
        </button>
      </div>
    </form>
  )
}

