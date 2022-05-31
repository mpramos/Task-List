import React from 'react'
import { TodoContext } from '../TodoContext'
import './TodoSearch.css'
export const TodoSearch = () => {
  const {searchValue,setSearchValue}=React.useContext(TodoContext)
  const onSearchValueChange=(event)=>{
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }
  return (

    <>
    <input className='TodoSearch'
     placeholder='Cebolla 1'
     value={searchValue}
     onChange={onSearchValueChange}
     />
    </>
  )
}
