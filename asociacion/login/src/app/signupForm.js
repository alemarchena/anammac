import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import {ShowMessage} from './showmessage.js'
import {CrearUsuarioBDD} from './accesobdd.js'
import {CerrarModal} from './modal.js'


const registroForm = document.querySelector("#registrar-form");

registroForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email = registroForm['registroemail'].value;
    const password = registroForm['registropassword'].value;
    
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);

        CerrarModal();
        CrearUsuarioBDD(userCredentials.user.email);
        ShowMessage("Bienvenid@ " + userCredentials.user.email ,"success");

    }catch(error){

        if(error.code === 'auth/invalid-email')
        {
            ShowMessage('Email inválido','error');
        }else if(error.code === 'auth/weak-password'){
            ShowMessage('Password inválida','error');
        }else if(error.code === 'auth/email-already-in-use'){
            ShowMessage('El usuario ya existe','error');
        }else if(error.code){
            ShowMessage('Ocurrió un error','error');
        }
    }
})