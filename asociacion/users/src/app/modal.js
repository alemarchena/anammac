
import {ShowMessage} from './showmessage.js'
const imagenlogueado  = document.querySelector("#imagenlogueado");

export const CerrarModal = (()=>{
    //Cerrar el modal de boostrap
     const registromodal =  document.querySelector("#loginModal");
     const modal = bootstrap.Modal.getInstance(registromodal);
     modal.hide();
})

export const MostarImagenLogin = ((imagen,ruta)=>{
    if(ruta == undefined)
    {
        setTimeout(() => {
            try {
                imagenlogueado.src = imagen;
            } catch (error) {
                
            }
        }, 1000);
        
    }
    else if(ruta == '')
        imagenlogueado.src = '../src/imgafiliados/' + imagen;

})