import React from 'react'
import './TodoSearch.css'
export const TodoSearch = ({searchValue,setSearchValue}) => {
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
