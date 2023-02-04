
// import {ShowMessage} from './showmessage.js'
export const CerrarModal = (()=>{
    //Cerrar el modal de boostrap
     const registromodal =  document.querySelector("#loginModal");
     const modal = bootstrap.Modal.getInstance(registromodal);
     modal.hide();
})
