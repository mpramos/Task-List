import React from 'react'
import './TodoItem.css'
export const TodoItem = (props) => {
  
  const onDelete =()=>{
    alert('Borraste el todo ' + props.text)
  }
  return (
      <li className="TodoItem">
          <span className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
          onClick={props.onComplete}
          >
          √ </span>
          <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
          <span 
          className={`Icon Icon-delete ${props.completed && 'Icon-delete:hover '}`}
          onClick={props.onDelete}
          >
          X
          </span>
      </li>
  )
}
