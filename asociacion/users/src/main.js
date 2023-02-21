document.oncontextmenu = () => { return false;}

document.addEventListener("keydown", function(event){
    var key = event.key ;
    if (key == 'F12') {
        window.location.reload();
    } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
        window.close();
    }
}, false);



import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './app/firebase.js'
import {logincheck} from './app/logincheck.js?a=67'
import  './app/signupForm.js?a=67'
import  './app/logout.js?a=67'
import  './app/signinform.js?a=67'
import  './app/googlelogin.js?a=67'
import  './app/verclave.js?a=67'
import  './app/resetpassword.js?a=67'
import  './app/redireccion.js?a=67'
import  './app/aviso.js?a=67'
import  './app/ira.js?a=67'
import  './app/eventosdisponibles.js?a=67'
import  './app/formulario.js?a=67'
import  './app/comprobanteevento.js?a=67';

onAuthStateChanged(auth,async (user) => {
    logincheck(user);
})


$("#App").load("bienvenidos.html");

