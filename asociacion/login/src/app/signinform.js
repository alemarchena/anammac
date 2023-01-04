import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import {CerrarModal} from './modal.js'
import {ShowMessage} from './showmessage.js'

const signinform = document.querySelector("#login-form");

signinform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const email = signinform['loginemail'].value;
    const password = signinform['passwordemail'].value;

    try{
        const credentials = await signInWithEmailAndPassword(auth,email,password);

        CerrarModal();
        ShowMessage("Bienvenid@ " + credentials.user.email  ,"success",3000);
       
    }catch(error){
        if(error.code === 'auth/wrong-password')
        {
            ShowMessage("Password errónea","error",3000);
        }else if(error.code === 'auth/user-not-found')
        {
            ShowMessage("El usuario no existe","error",3000);
        }else
        {
            ShowMessage(error,"error",3000);
        }
    }
})