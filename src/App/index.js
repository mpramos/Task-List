import React from "react";
// ? Acá es donde importaremos al Provider
import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";

function App() {
  return (
    // !Envolvermos dentro del TodoProvider
    <TodoProvider>
      {/* //*? Cualquier componente que esté dentro del AppUI podrá llamar al consummer  */}
      {/* //*? Para poder consumir todo lo que esté aqui */}
      <AppUI
      // *? Las propiedadess de acá se fueron al index del contexto
      />
    </TodoProvider>
  )
}

export default App;
