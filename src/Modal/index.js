import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'
/**
 * @children
 * ? Enviamos algun contenido
 * */
function Modal({children}) {
    return ReactDOM.createPortal(
        <div className='ModalBackground'>
            {children}
        </div>,
     document.getElementById("modal")
    );
}
export {Modal}