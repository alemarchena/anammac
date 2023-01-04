
// import {ShowMessage} from './showmessage.js'
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
        try {
            setTimeout(() => {
                imagenlogueado.src = imagen;
            }, 500);
        } catch (error) {
            imagenlogueado.src = '../img/' + imagen;
        }

    }
    else if(ruta == '')
        imagenlogueado.src = '../img/' + imagen;

})