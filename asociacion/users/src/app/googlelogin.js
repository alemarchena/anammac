import { GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'
import {ShowMessage} from './showmessage.js'
import {Loguear} from './formulario.js'
import {CerrarModal,MostarImagenLogin} from './modal.js'


const googlebutton  = document.querySelector("#logingoogle");

googlebutton.addEventListener('click', async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();

    try {
        const credentials = await signInWithPopup(auth,provider);
        
        CerrarModal();
        ShowMessage("Bienvenid@ " + credentials.user.displayName,"success",3000)
        MostarImagenLogin(credentials.user.photoURL);
        Loguear(credentials.user.email);
        
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        ShowMessage("Se produjo un error al autenticar, error : " + error.code,"error",3000);
    }
})