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
import {auth} from './app/firebase.js?a=23'

import {logincheck} from './app/logincheck.js?a=23'

import './app/signupForm.js?a=23'
import './app/logout.js?a=23'

import './app/signinform.js?a=23';
import './app/signincode.js?a=23'
import './app/googlelogin.js?a=23'

import './app/interfaz.js?a=23'
import './app/teclado.js?a=23'
import './app/verclave.js?a=23'
import './app/resetpassword.js?a=23'
import './app/redireccion.js?a=23'
import './app/credencial.js?a=23'
import './app/formulario.js?a=23'

onAuthStateChanged(auth,async (user) => {
    logincheck(user);
})


