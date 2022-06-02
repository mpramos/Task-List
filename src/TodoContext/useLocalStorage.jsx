import React from "react";
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
    },[]);
  
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
  export{useLocalStorage}