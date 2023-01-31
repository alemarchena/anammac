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
import {logincheck} from './app/logincheck.js?a=58'
import './app/signupForm.js?a=58'
import './app/logout.js?a=58'
import './app/signinform.js?a=58'
import './app/googlelogin.js?a=58'
import './app/verclave.js?a=58'
import './app/resetpassword.js?a=58'
import './app/redireccion.js?a=58'
import './app/aviso.js?a=58'
import './app/ira.js?a=58'


onAuthStateChanged(auth,async (user) => {
    logincheck(user);
})


$("#App").load("bienvenidos.html");

