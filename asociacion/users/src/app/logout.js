import { signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import { LoggMenu } from "./logincheck.js?a=59";
import { ShowMessage } from "./showmessage.js?a=59";
import {DesActivarSistema,LoadURL} from './cargarsistema.js?a=59'
import {Info,LlenarFormulario} from './formulario.js?a=59'

export const logout = document.querySelector("#logout");

logout.addEventListener('click',async ()=>{
    await signOut(auth);
    ShowMessage('Has salido de tu cuenta','success',3000);
    LoggMenu(0);
    DesActivarSistema();
    // LoadURL("bienvenidos.html");
    // const formulario = new Info('','','','','','','','','','','','','');
    // LlenarFormulario(formulario);
    setTimeout(() => {
        location.reload();
    }, 500);

})