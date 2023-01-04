import { signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {auth} from './firebase.js'


export const logout = document.querySelector("#logout");
logout.addEventListener('click',async ()=>{
    
    await signOut(auth);
})

export const Salir = ( async ()=>{
    await signOut(auth);

});