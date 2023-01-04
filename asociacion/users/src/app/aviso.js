import {ShowMessage} from './showmessage.js'

const botonlogin = document.getElementById("botonlogin");

botonlogin.addEventListener('click',()=>{
    avisar();
});
export const avisar = (()=>{
    ShowMessage("Acepte las políticas de privacidad","success","4000");
})
