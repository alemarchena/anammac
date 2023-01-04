import {ShowMessage} from './showmessage.js'
import {LeerCodigoUsuarioBDD} from './accesobdd.js'

const codigo = document.querySelector("#codigo");

document.getElementById('logincodigo').addEventListener('click',(e)=>{
    if(codigo.value != '')
        LeerCodigoUsuarioBDD(codigo.value);
    else
        ShowMessage("Ingrese un código válido","error",4000)
    e.preventDefault();
})
